import {useMutation} from "@apollo/react-hooks";
import NetInfo from "@react-native-community/netinfo";
import {CommonActions} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {AsyncStorage} from "react-native";
import {postDelivery, structurePacketData, UPDATE_PACKET} from "./Requests";

type tourType = any;

export const TourContext = React.createContext<{
    tour: tourType;
    packets: null | {};
    error: null | string;
    setTour: (tour: any) => void;
    removeTour: () => void;
    setError: (error: string) => void;
    showNavigation: boolean;
    toggleNavigation: () => void;
    showTourListe: boolean;
    toggleTourListe: () => void;
    showPaketGeben: boolean;
    togglePaketGeben: () => void;
    currentStop: number;
    currentPacket: number;
    nextStop: () => void;
    resetTour: (navigation) => void;
    reportDelivery: (sscc, deliveryDate) => void;
    deliverPacket: (signature, sscc, tourID, tourStop) => void;
}>({
    tour: null,
    packets: null,
    error: null,
    setTour: () => {},
    removeTour: () => {},
    setError: () => {},
    showNavigation: false,
    toggleNavigation: () => {},
    showTourListe: false,
    toggleTourListe: () => {},
    showPaketGeben: false,
    togglePaketGeben: () => {},
    currentStop: 1,
    currentPacket: 0,
    nextStop: () => {},
    resetTour: (navigation) => {},
    reportDelivery: (sscc, deliveryDate) => {},
    deliverPacket: () => {},
});

export const TourProvider = ({children}) => {
    const [tour, setTour] = useState(null);
    const [packets, setPackets] = useState(null);
    const [offlinePackets, setOfflinePackets] = useState(null);
    const [error, setError] = useState(null);
    const [currentStop, setCurrentStop] = useState(1);
    const [currentPacket, setCurrentPacket] = useState(0);
    const [showTourListe, setShowTourListe] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showPaketGeben, setShowPaketGeben] = useState(false);
    const [updatePacket] = useMutation(UPDATE_PACKET);

    const queuePacket = (signature, sscc, tourID, tourStop) => {
        AsyncStorage.getItem("offlinePackets")
            .then((current) => {
                let offlineBuffer = current ? JSON.parse(current) : [];
                offlineBuffer.push({signature, sscc, tourID, tourStop});
                setOfflinePackets(offlineBuffer);
                AsyncStorage.setItem("offlinePackets", JSON.stringify(offlineBuffer));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const runQueue = async () => {
        console.log("run queue");
        let queueBuffer = [];
        await AsyncStorage.getItem("offlinePackets").then(async (current) => {
            const currentQueue = current && current.length ? JSON.parse(current) : null;
            await Promise.all(
                currentQueue.map(async (queuePacket) => {
                    await updatePacket(
                        structurePacketData(
                            queuePacket.signature,
                            queuePacket.sscc,
                            queuePacket.tourID,
                            queuePacket.tourStop
                        )
                    )
                        .then(({data, errors}) => {
                            if (errors && errors[0]) {
                                console.log("graphql error:", errors[0].message);
                                console.log("re-queuing packet");
                                queueBuffer.push(queuePacket);
                            } else {
                                console.log("graphql success:");
                                console.log(data);
                                console.log("packet resolved, not requeueing");
                            }
                        })
                        .catch((err) => {
                            console.log("network error:", err);
                            console.log("re-queuing packet");
                            queueBuffer.push(queuePacket);
                        });
                })
            );
        });
        console.log("resulting queue packets: " + queueBuffer.length);
        AsyncStorage.setItem("offlinePackets", JSON.stringify(queueBuffer));
    };

    useEffect(() => {
        // reload offlinePackets into state
        if (!offlinePackets) {
            AsyncStorage.getItem("offlinePackets")
                .then((current) => JSON.parse(current))
                .then((currentPackets) => {
                    if (currentPackets && currentPackets.length) {
                        console.log("current queue length:", currentPackets.length);
                        setOfflinePackets(currentPackets);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (offlinePackets) {
            // add eventListener when packets are queued
            NetInfo.addEventListener((state) => {
                // console.log("Connection type", state.type);
                console.log("is connected?", state.isConnected);
                console.log("queue packets:", offlinePackets.length);
                if (state.isConnected && offlinePackets && offlinePackets.length) {
                    runQueue();
                }
            });
        }
    }, [offlinePackets]);

    return (
        <TourContext.Provider
            value={{
                tour,
                packets,
                error,
                showNavigation,
                showTourListe,
                showPaketGeben,
                currentStop,
                currentPacket,
                setTour: (tour) => {
                    setTour(tour.tours[0]); // change name
                    setPackets(tour.tours[0].packets);
                    AsyncStorage.setItem("tour", JSON.stringify(tour));
                },
                removeTour: () => {
                    setTour(null);
                    AsyncStorage.removeItem("tour");
                },
                setError: (error) => {
                    setError(error);
                },
                toggleNavigation: () => {
                    setShowNavigation(!showNavigation);
                },
                toggleTourListe: () => {
                    setShowTourListe(!showTourListe);
                },
                togglePaketGeben: () => {
                    setShowPaketGeben(!showPaketGeben);
                },
                nextStop: () => {
                    setCurrentStop(currentStop + 1);
                    setCurrentPacket(currentPacket + 1);
                },
                resetTour: (navigation) => {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            history: [{}],
                            routes: [{name: "TourSuche"}],
                        })
                    );
                    setCurrentStop(1);
                    setCurrentPacket(0);
                    setTour(null);
                    AsyncStorage.removeItem("tour");
                },
                reportDelivery: (sscc, deliveryDate) => {
                    postDelivery(sscc, deliveryDate)
                        .then((result) => console.log(result))
                        .catch((err) => console.log(err));
                },
                deliverPacket: (signature, sscc, tourID, tourStop) => {
                    updatePacket(structurePacketData(signature, sscc, tourID, tourStop))
                        .then(({data, errors}) => {
                            if (errors && errors[0]) {
                                console.log("graphql error:", errors[0].message);
                                console.log("queuing packet");
                                queuePacket(signature, sscc, tourID, tourStop);
                            } else {
                                console.log("graphql success: ");
                                console.log(data);
                            }
                        })
                        .catch((err) => {
                            console.log("network error:", err);
                            console.log("queuing packet");
                            queuePacket(signature, sscc, tourID, tourStop);
                        });
                },
            }}
        >
            {children}
        </TourContext.Provider>
    );
};
