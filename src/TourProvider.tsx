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
}>({
    tour: null,
    error: null,
    setTour: () => {},
    removeTour: () => {},
    setError: () => {},
});

interface TourProviderProps {}
export const TourProvider: React.FC<TourProviderProps> = ({children}) => {
    const [tour, setTour] = useState(null);
    const [error, setError] = useState(null);
    return (
        <TourContext.Provider
            value={{
                tour,
                error,
                setTour: (tour) => {
                    setTour(tour);
                    // AsyncStorage.addItem("tour");
                },
                removeTour: (tour) => {
                    setTour(null);
                    // AsyncStorage.removeItem("tour");
                },
                setError: (error) => {
                    setError(error);
                },
            }}
        >
            {children}
        </TourContext.Provider>
    );
};
