import {useMutation, useQuery} from "@apollo/react-hooks";
import NetInfo from "@react-native-community/netinfo";
import {CommonActions} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {AsyncStorage} from "react-native";
import {
    postDelivery,
    structurePacketData,
    UPDATE_PACKET,
    postPickup,
    CREATE_PACKET,
    structureCreatePacketData,
    QUERY_PACKETS,
} from "./Requests";

type tourType = any; // specify

export const TourContext = React.createContext<{
    tour: tourType;
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
    setStop: (stop) => void;
    nextStop: () => void;
    finishTour: (navigation) => void;
    reportPickup: (sscc, pickDate) => void;
    reportDelivery: (sscc, deliveryDate) => void;
    deliverPacket: (signature, sscc, tourID, tourStop) => void;
}>({
    tour: null,
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
    setStop: () => {},
    nextStop: () => {},
    finishTour: () => {},
    reportPickup: (sscc, pickDate) => {},
    reportDelivery: () => {},
    deliverPacket: () => {},
});

export const TourProvider = ({children}) => {
    const [tour, setTour] = useState(null);
    const [pickupQueue, setPickupQueue] = useState(0);
    const [deliveryQueue, setDeliveryQueue] = useState(0);
    const [packetQueue, setPacketQueue] = useState(0);
    const [isOnline, setIsOnline] = useState(false);
    const [error, setError] = useState(null);
    const [currentStop, setCurrentStop] = useState(1);
    const [showTourListe, setShowTourListe] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showPaketGeben, setShowPaketGeben] = useState(false);
    const [updatePacket] = useMutation(UPDATE_PACKET);
    const [createPacket] = useMutation(CREATE_PACKET);
    // const {data, loading, error: queryErr} = useQuery(QUERY_PACKETS);

    // const callCreatePacket = (sscc) => {
    //     console.log(structureCreatePacketData(sscc));
    //     createPacket(structureCreatePacketData(sscc))
    //         .then(({data, errors}) => {
    //             if (errors && errors[0]) {
    //                 errors.forEach((error) => {
    //                     console.log(error);
    //                 });
    //                 // console.log("graphql error:", errors[0].message, );
    //             } else {
    //                 console.log("graphql success | packet reported");
    //                 console.log("data:");
    //                 console.log(data);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("network error:", err);
    //         });
    //     data && console.log(data);
    //     queryErr && console.log(queryErr);
    // };

    const queuePickup = (sscc, pickDate) => {
        // queue unsuccesful pickup report into asyncstorage
        AsyncStorage.getItem("pickupQueue")
            .then((current) => {
                let pickupBuffer = current ? JSON.parse(current) : [];
                pickupBuffer.push({sscc, pickDate});
                setPickupQueue(pickupBuffer.length);
                AsyncStorage.setItem("pickupQueue", JSON.stringify(pickupBuffer));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const queueDelivery = (sscc, deliveryDate) => {
        // queue unsuccesful delivery report into asyncstorage
        AsyncStorage.getItem("deliveryQueue")
            .then((current) => {
                let deliveryBuffer = current ? JSON.parse(current) : [];
                deliveryBuffer.push({sscc, deliveryDate});
                setDeliveryQueue(deliveryBuffer.length);
                AsyncStorage.setItem("deliveryQueue", JSON.stringify(deliveryBuffer));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const queuePacket = (signature, sscc, tourID, tourStop) => {
        // queue unsuccesful packet update into asyncstorage
        AsyncStorage.getItem("packetQueue")
            .then((current) => {
                let packetBuffer = current ? JSON.parse(current) : [];
                packetBuffer.push({signature, sscc, tourID, tourStop});
                setPacketQueue(packetBuffer.length);
                AsyncStorage.setItem("packetQueue", JSON.stringify(packetBuffer));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const runPickupQueue = async () => {
        // resolve queued pickup reports
        console.log("run pickup queue");
        let queueBuffer = [];
        await AsyncStorage.getItem("pickupQueue").then(async (current) => {
            const currentQueue = current && current.length ? JSON.parse(current) : [];
            await Promise.all(
                currentQueue.map(async (queuePickup) => {
                    await postPickup(queuePickup.sscc, queuePickup.pickDate)
                        .then((result) => {
                            console.log(result);
                            console.log("pickup resolved, not requeueing");
                        })
                        .catch((err) => {
                            console.log("request error:", err);
                            console.log("re-queuing pickup");
                            queueBuffer.push(queuePickup);
                        });
                })
            );
        });
        console.log("resulting queue pickups: " + queueBuffer.length);
        AsyncStorage.setItem("pickupQueue", JSON.stringify(queueBuffer));
        //     .then(() =>
        //     setPickupQueue(queueBuffer.length)
        // );
    };

    const runDeliveryQueue = async () => {
        // resolve queued delivery reports
        console.log("run delivery queue");
        let queueBuffer = [];
        await AsyncStorage.getItem("deliveryQueue").then(async (current) => {
            const currentQueue = current && current.length ? JSON.parse(current) : [];
            await Promise.all(
                currentQueue.map(async (queueDelivery) => {
                    await postDelivery(queueDelivery.sscc, queueDelivery.deliveryDate)
                        .then((result) => {
                            console.log(result);
                            console.log("delivery resolved, not requeueing");
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
        //     .then(() =>
        //     setDeliveryQueue(queueBuffer.length)
        // );
    };

    const runPacketQueue = async () => {
        // resolve queued packet updates
        console.log("run packet queue");
        let queueBuffer = [];
        await AsyncStorage.getItem("packetQueue").then(async (current) => {
            const currentQueue = current && current.length ? JSON.parse(current) : [];
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
        //     .then(() =>
        //     setPacketQueue(queueBuffer.length)
        // );
    };

    useEffect(() => {
        (async () => {
            // reload offline queues into state
            await AsyncStorage.multiGet(["pickupQueue", "deliveryQueue", "packetQueue"])
                .then((queueObject) => {
                    console.log("queue load");
                    if (queueObject) {
                        // error handling
                        const storedPickups = JSON.parse(queueObject[0][1]);
                        const storedDeliveries = JSON.parse(queueObject[1][1]);
                        const storedPackets = JSON.parse(queueObject[2][1]);

                        if (storedPickups && storedPickups.length) {
                            console.log("current pickupQueue length:", storedPickups.length);
                            setPickupQueue(storedPickups.length);
                        }
                        if (storedDeliveries && storedDeliveries.length) {
                            console.log("current deliveryQueue length:", storedDeliveries.length);
                            setDeliveryQueue(storedDeliveries.length);
                        }
                        if (storedPackets && storedPackets.length) {
                            console.log("current packetQueue length:", storedPackets.length);
                            setPacketQueue(storedPackets.length);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            // add connection state event listener
            NetInfo.addEventListener((state) => {
                setIsOnline(state.isConnected ? true : false);
            });
        })();
    }, []);

    useEffect(() => {
        // run offline queues when packetQueue, deliveryQueue or isOnline state changes
        console.log("is online:", isOnline);
        if (isOnline) {
            pickupQueue && runPickupQueue();
            deliveryQueue && runDeliveryQueue();
            packetQueue && runPacketQueue();
        }
    }, [pickupQueue, deliveryQueue, packetQueue, isOnline]);

    return (
        <TourContext.Provider
            value={{
                tour,
                error,
                showNavigation,
                showTourListe,
                showPaketGeben,
                currentStop,
                setError: (error) => {
                    setError(error);
                },
                setTour: (tour) => {
                    setTour(tour.tours[0]); // change name
                    AsyncStorage.setItem("tour", JSON.stringify(tour));
                    // setCurrentStop(1);
                },
                removeTour: () => {
                    setTour(null);
                    AsyncStorage.removeItem("tour");
                },
                finishTour: async (navigation) => {
                    // reset navigation
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            history: [{}],
                            routes: [{name: "TourSuche"}],
                        })
                    );
                    // save tour object to TourLogbuch
                    AsyncStorage.getItem("TourLogbuch").then((current) => {
                        let logBuffer = current ? JSON.parse(current) : [];
                        logBuffer.push(tour);
                        AsyncStorage.setItem("TourLogbuch", JSON.stringify(logBuffer));
                    });
                    // reset tour parameters
                    setCurrentStop(0);
                    setTour(null);
                    AsyncStorage.removeItem("tour");
                    AsyncStorage.removeItem("currentStop");
                },
                setStop: (stop) => {
                    console.log("setting current stop:", stop);
                    setCurrentStop(parseInt(stop));
                    AsyncStorage.setItem("currentStop", String(stop));
                },
                nextStop: () => {
                    setCurrentStop(currentStop + 1);
                    AsyncStorage.setItem("currentStop", String(currentStop + 1));
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
                reportPickup: (sscc, pickDate) => {
                    postPickup(sscc, pickDate)
                        .then((result) =>
                            console.log(
                                "pickup reported | status:",
                                result.status,
                                "data:",
                                result.data
                            )
                        )
                        .catch((err) => {
                            console.log("request error:", err);
                            console.log("queuing pickup report");
                            queuePickup(sscc, pickDate);
                        });
                },
                reportDelivery: (sscc, deliveryDate) => {
                    // reportDelivery REST post request
                    // callCreatePacket(sscc);
                    postDelivery(sscc, deliveryDate)
                        .then((result) =>
                            console.log(
                                "delivery reported | status:",
                                result.status,
                                "data:",
                                result.data
                            )
                        )

                        .catch((err) => {
                            console.log("request error:", err);
                            console.log("queuing delivery report");
                            queueDelivery(sscc, deliveryDate);
                        });
                },
                deliverPacket: (signature, sscc, tourID, tourStop) => {
                    // updatePacket graphql mutation
                    console.log(structurePacketData(signature, sscc, tourID, tourStop));
                    updatePacket(structurePacketData(signature, sscc, tourID, tourStop))
                        .then(({data, errors}) => {
                            if (errors && errors[0]) {
                                console.log("graphql error:", errors[0].message);
                                console.log("queuing packet");
                                queuePacket(signature, sscc, tourID, tourStop);
                            } else {
                                console.log("graphql success | packet reported");
                                console.log("data:");
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
