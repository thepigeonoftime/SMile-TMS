import React, {useState} from "react";
import {AsyncStorage} from "react-native";

type tourType = any;

export const TourContext = React.createContext<{
    tour: tourType;
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
    nextStop: () => void;
    resetStops: () => void;
    saveSignature: (sig: string) => void;
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
    nextStop: () => {},
    resetStops: () => {},
    saveSignature: () => {},
});

export const TourProvider = ({children}) => {
    const [tour, setTour] = useState(null);
    const [error, setError] = useState(null);
    const [currentStop, setCurrentStop] = useState(1);
    const [showTourListe, setShowTourListe] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showPaketGeben, setShowPaketGeben] = useState(false);

    return (
        <TourContext.Provider
            value={{
                tour,
                error,
                showNavigation,
                showTourListe,
                showPaketGeben,
                currentStop,
                setTour: (tour) => {
                    setTour(tour.tours[0]);
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
                },
                resetStops: () => {
                    setCurrentStop(1);
                },
                saveSignature: (sig) => {
                    AsyncStorage.getItem("signatures")
                        .then((current) => {
                            let sigs = current ? JSON.parse(current) : [];
                            sigs.push(sig);
                            // console.log(sigs);
                            // console.log(sigs.length);
                            AsyncStorage.setItem("signatures", JSON.stringify(sigs));
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
            }}
        >
            {children}
        </TourContext.Provider>
    );
};
