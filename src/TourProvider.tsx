import React, {useState, useEffect} from "react";
import {AsyncStorage} from "react-native";
import {structurePacketData, UPDATE_PACKET, postDelivery} from "./Requests";
import {useMutation} from "@apollo/react-hooks";
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";

type tourType = any;

export const TourContext = React.createContext<{
    tour: tourType;
    packets: null | {};
    error: null | string;
    setTour: (tour: any) => void;
    removeTour: (tour: any) => void;
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
    resetTour: () => void;
    reportDelivery: (sscc, deliveryDate) => void;
    deliverPacket: (sig, tourStop, sscc, tourID) => void;
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
    resetTour: () => {},
    reportDelivery: (sscc, deliveryDate) => {},
    deliverPacket: () => {},
});

export const TourProvider = ({children}) => {
    const [tour, setTour] = useState(null);
    const [packets, setPackets] = useState(null);
    const [error, setError] = useState(null);
    const [currentStop, setCurrentStop] = useState(1);
    const [currentPacket, setCurrentPacket] = useState(0);
    const [showTourListe, setShowTourListe] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showPaketGeben, setShowPaketGeben] = useState(false);
    const [updatePacket] = useMutation(UPDATE_PACKET);

    const queuePacket = (sig, tourStop, sscc, tourID) => {
        AsyncStorage.getItem("packets")
            .then((current) => {
                let packets = current ? JSON.parse(current) : [];
                packets.push({sig, tourStop, sscc, tourID});
                // console.log(packets);
                AsyncStorage.setItem("packets", JSON.stringify(packets));
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                    // AsyncStorage.setItem("tour", tour);
                },
                removeTour: (tour) => {
                    setTour(null);
                    // AsyncStorage.removeItem("tour");
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
                resetTour: () => {
                    setCurrentStop(1);
                    setCurrentPacket(0);
                    setTour(null);
                },
                reportDelivery: (sscc, deliveryDate) => {
                    postDelivery(sscc, deliveryDate)
                        .then((result) => console.log(result))
                        .catch((err) => console.log(err));
                },
                deliverPacket: (sig, tourStop, sscc, tourID) => {
                    console.log(sig, tourStop, sscc, tourID);
                    updatePacket(structurePacketData(sig, tourStop, sscc, tourID))
                        .then((result) => {
                            console.log(result);
                        })
                        .catch((err) => {
                            console.log(err);
                            queuePacket(sig, tourStop, sscc, tourID);
                        });
                },
            }}
        >
            {children}
        </TourContext.Provider>
    );
};
