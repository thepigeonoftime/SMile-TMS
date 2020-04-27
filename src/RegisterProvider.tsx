import React, {useState, useEffect} from "react";
import {AsyncStorage} from "react-native";
import Axios from "axios";

type registerType = {} | null;

export const RegisterContext = React.createContext<{
    registered: null | string;
    dataPerson: any;
    dataFahrzeug: any;
    dataGebiet: any;
    dataZeiten: any;
    showRegModal: boolean;
    register: () => any;
    unregister: () => void;
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
                register: () => {
                    return new Promise((resolve, reject) => {
                        Axios.post("http://127.0.0.1:3001/registerData", dataPerson)
                            .then((response) => {
                                console.log(response.status);
                                setRegistered("smile");
                                AsyncStorage.setItem("registered", "true");
                                console.log("registered");
                                resolve("registered");
                            })
                            .catch((error) => {
                                if (!error.status) {
                                    // network error
                                    console.log("network error");
                                } else if (error.request) {
                                    // no response
                                    console.log(error.request);
                                } else if (error.response) {
                                    // non 200
                                    console.log(error.response.data);
                                    console.log(error.response.status);
                                    console.log(error.response.headers);
                                } else {
                                    // request error
                                    console.log("Error", error.message);
                                }
                                reject("reg error");
                            });
                    });
                },
                unregister: () => {
                    setRegistered(null);
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
