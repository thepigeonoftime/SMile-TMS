import React, {useState} from "react";

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
    signatureURI: null | string;
    saveSignature: (uri: string) => void;
    tourNav: any;
    currentStop: number;
    nextStop: () => void;
    resetStops: () => void;
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
    signatureURI: null,
    saveSignature: () => {},
    tourNav: null,
    currentStop: 1,
    nextStop: () => {},
    resetStops: () => {},
});

export const TourProvider = ({navigation, children}) => {
    const [tour, setTour] = useState(null);
    const [error, setError] = useState(null);
    const [currentStop, setCurrentStop] = useState(1);
    const [showTourListe, setShowTourListe] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showPaketGeben, setShowPaketGeben] = useState(false);
    const [signatureURI, setSignatureURI] = useState(null);
    const tourNav = navigation;

    return (
        <TourContext.Provider
            value={{
                tour,
                error,
                showNavigation,
                showTourListe,
                showPaketGeben,
                signatureURI,
                tourNav,
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
                saveSignature: (uri) => {
                    setSignatureURI(uri);
                },
                nextStop: () => {
                    setCurrentStop(currentStop + 1);
                },
                resetStops: () => {
                    setCurrentStop(1);
                },
            }}
        >
            {children}
        </TourContext.Provider>
    );
};
