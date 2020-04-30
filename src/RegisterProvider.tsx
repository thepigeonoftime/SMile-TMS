import React, {useState, useEffect} from "react";
import {AsyncStorage} from "react-native";
import {registerRequest} from "./Requests";

type registerType = {} | null;

export const RegisterContext = React.createContext<{
    registered: null | string;
    dataPerson: any;
    dataFahrzeug: any;
    dataGebiet: any;
    dataZeiten: any;
    showRegModal: boolean;
    register: () => void;
    unregister: () => void;
    registration: () => any;
    storeDataPerson: (data) => void;
    storeDataFahrzeug: (data) => void;
    storeDataGebiet: (data) => void;
    storeDataZeiten: (data) => void;
    toggleRegModal: () => void;
}>({
    registered: null,
    dataPerson: null,
    dataFahrzeug: null,
    dataGebiet: null,
    dataZeiten: null,
    showRegModal: false,
    register: () => {},
    unregister: () => {},
    registration: () => {},
    storeDataPerson: (data) => {},
    storeDataFahrzeug: (data) => {},
    storeDataGebiet: (data) => {},
    storeDataZeiten: (data) => {},
    toggleRegModal: () => {},
});

interface RegisterProviderProps {}
export const RegisterProvider: React.FC<RegisterProviderProps> = ({children}) => {
    const [registered, setRegistered] = useState<null | string>(null);
    const [dataPerson, setDataPerson] = useState<registerType>(null);
    const [dataFahrzeug, setDataFahrzeug] = useState<registerType>(null);
    const [dataGebiet, setDataGebiet] = useState<registerType>(null);
    const [dataZeiten, setDataZeiten] = useState<registerType>(null);
    const [showRegModal, setShowRegModal] = useState<boolean>(false);

    return (
        <RegisterContext.Provider
            value={{
                registered,
                dataPerson,
                dataFahrzeug,
                dataGebiet,
                dataZeiten,
                showRegModal,
                registration: () => {
                    return new Promise((resolve, reject) => {
                        registerRequest("data")
                            .then(() => {
                                setRegistered("smile");
                                AsyncStorage.setItem("registered", "true");
                                resolve();
                            })
                            .catch(() => reject);
                    });
                },
                register: () => {
                    setRegistered("smile");
                    AsyncStorage.setItem("registered", "true");
                },
                unregister: () => {
                    setRegistered(null);
                    AsyncStorage.removeItem("registered");
                    // AsyncStorage.removeItem("registered");
                    // AsyncStorage.removeItem("dataPerson");
                    // AsyncStorage.removeItem("dataFahrzeug");
                    // AsyncStorage.removeItem("dataGebiet");
                    // AsyncStorage.removeItem("dataZeiten");
                    console.log("unregistered");
                },
                storeDataPerson: (data) => {
                    if (data) {
                        setDataPerson(data);
                        AsyncStorage.setItem("dataPerson", data);
                    }
                },
                storeDataFahrzeug: (data) => {
                    if (data) {
                        setDataFahrzeug(data);
                        AsyncStorage.setItem("dataFahrzeug", data);
                    }
                },
                storeDataGebiet: (data) => {
                    if (data) {
                        setDataGebiet(data);
                        AsyncStorage.setItem("dataGebiet", data);
                    }
                },
                storeDataZeiten: (data) => {
                    if (data) {
                        setDataZeiten(data);
                        AsyncStorage.setItem("dataZeiten", data);
                    }
                },
                toggleRegModal: () => {
                    setShowRegModal(!showRegModal);
                },
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};
