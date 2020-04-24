import React, {useState} from "react";
import {AsyncStorage} from "react-native";
import {TourStack} from "./TourStack";

type tourType = any;

export const TourContext = React.createContext<{
    tour: tourType;
    error: null | string;
    setTour: (tour) => void;
    removeTour: (tour) => void;
    setError: (tour) => void;
    showNavigation: boolean;
    toggleNavigation: () => void;
    showTourListe: boolean;
    toggleTourListe: () => void;
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
});

interface TourProviderProps {}
export const TourProvider: React.FC<TourProviderProps> = ({children}) => {
    const [tour, setTour] = useState(null);
    const [error, setError] = useState(null);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showTourListe, setShowTourListe] = useState(false);
    return (
        <TourContext.Provider
            value={{
                tour,
                error,
                showNavigation,
                showTourListe,
                setTour: (tour) => {
                    setTour(tour);
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
            }}
        >
            {children}
        </TourContext.Provider>
    );
};
