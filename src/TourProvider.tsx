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
    const [packetQueue, setPacketQueue] = useState(null);
    const [deliveryQueue, setDeliveryQueue] = useState(null);
    const [error, setError] = useState(null);
    const [currentStop, setCurrentStop] = useState(1);
    const [currentPacket, setCurrentPacket] = useState(0);
    const [showTourListe, setShowTourListe] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showPaketGeben, setShowPaketGeben] = useState(false);
    const [updatePacket] = useMutation(UPDATE_PACKET);

    const queuePacket = (signature, sscc, tourID, tourStop) => {
        // queue unsuccesful packet update in asyncstorage
        AsyncStorage.getItem("packetQueue")
            .then((current) => {
                let packetBuffer = current ? JSON.parse(current) : [];
                packetBuffer.push({signature, sscc, tourID, tourStop});
                setPacketQueue(packetBuffer);
                AsyncStorage.setItem("packetQueue", JSON.stringify(packetBuffer));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const queueDelivery = (sscc, deliveryDate) => {
        // queue unsuccesful delivery report in asyncstorage
        AsyncStorage.getItem("deliveryQueue")
            .then((current) => {
                let deliveryBuffer = current ? JSON.parse(current) : [];
                deliveryBuffer.push({sscc, deliveryDate});
                setDeliveryQueue(deliveryBuffer);
                AsyncStorage.setItem("deliveryQueue", JSON.stringify(deliveryBuffer));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const runPacketQueue = async () => {
        // resolve queued packet updates
        console.log("run packet queue");
        let queueBuffer = [];
        await AsyncStorage.getItem("packetQueue").then(async (current) => {
            const currentQueue = current && current.length ? JSON.parse(current) : null;
            await Promise.all(
                currentQueue.map(async (queuePacket) => {
                    await updatePacket(
                        structurePacketData(
                            "queuePacket.signature",
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
        AsyncStorage.setItem("packetQueue", JSON.stringify(queueBuffer));
    };

    const runDeliveryQueue = async () => {
        // resolve queued delivery reports
        console.log("run delivery queue");
        let queueBuffer = [];
        await AsyncStorage.getItem("deliveryQueue").then(async (current) => {
            const currentQueue = current && current.length ? JSON.parse(current) : null;
            await Promise.all(
                currentQueue.map(async (queueDelivery) => {
                    await postDelivery(queueDelivery.sscc, queueDelivery.deliveryDate)
                        .then((result) => {
                            console.log(result);
                            console.log("packet resolved, not requeueing");
                        })
                        .catch((err) => {
                            console.log("request error:", err);
                            console.log("re-queuing delivery");
                            queueBuffer.push(queueDelivery);
                        });
                })
            );
        });
        console.log("resulting queue deliveries: " + queueBuffer.length);
        AsyncStorage.setItem("deliveryQueue", JSON.stringify(queueBuffer));
    };

    useEffect(() => {
        if (!packetQueue) {
            // reload packetQueue into state
            AsyncStorage.getItem("packetQueue")
                .then((current) => JSON.parse(current))
                .then((currentPackets) => {
                    if (currentPackets && currentPackets.length) {
                        console.log("current packetQueue length:", currentPackets.length);
                        setPacketQueue(currentPackets);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (!deliveryQueue) {
            // reload deliveryQueue into state
            AsyncStorage.getItem("deliveryQueue")
                .then((current) => JSON.parse(current))
                .then((currentDeliveries) => {
                    if (currentDeliveries && currentDeliveries.length) {
                        console.log("current deliveryQueue length:", currentDeliveries.length);
                        setDeliveryQueue(currentDeliveries);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (packetQueue || deliveryQueue) {
            // add eventListener when packet updates or delivery reports are queued
            NetInfo.addEventListener((state) => {
                // console.log("Connection type", state.type);
                console.log("is connected?", state.isConnected);
                packetQueue &&
                    packetQueue.length &&
                    console.log("queue packets:", packetQueue.length);
                deliveryQueue &&
                    deliveryQueue.length &&
                    console.log("queue deliveries:", deliveryQueue.length);
                if (state.isConnected) {
                    if (packetQueue && packetQueue.length) {
                        runPacketQueue();
                    }
                    if (deliveryQueue && deliveryQueue.length) {
                        runDeliveryQueue();
                    }
                }
            });
        }
    }, [packetQueue, deliveryQueue]);

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
                    // reset navigation
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            history: [{}],
                            routes: [{name: "TourSuche"}],
                        })
                    );
                    // reset tour parameters
                    setCurrentStop(1);
                    setCurrentPacket(0);
                    setTour(null);
                    AsyncStorage.removeItem("tour");
                },
                reportDelivery: (sscc, deliveryDate) => {
                    // reportDelivery REST post request
                    postDelivery(sscc, deliveryDate)
                        .then((result) => console.log(result))
                        .catch((err) => {
                            console.log("request error:", err);
                            console.log("queuing delivery report");
                            queueDelivery(sscc, deliveryDate);
                        });
                },
                deliverPacket: (signature, sscc, tourID, tourStop) => {
                    // updatePacket graphql mutation
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
