import React, {useState, useEffect} from "react";
import {AsyncStorage} from "react-native";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {structureRegData, CREATE_DELIVERER} from "./Requests";
import {RegisterContextProps} from "./Types";

type registerType = {} | null;

export const RegisterContext = React.createContext<RegisterContextProps>({
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
    const [createDeliverer] = useMutation(CREATE_DELIVERER);

    useEffect(() => {
        if (dataPerson === null) {
            AsyncStorage.getItem("dataPerson")
                .then((data) => {
                    if (data) {
                        setDataPerson(JSON.parse(data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (dataFahrzeug === null) {
            AsyncStorage.getItem("dataFahrzeug")
                .then((data) => {
                    if (data) {
                        setDataFahrzeug(JSON.parse(data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (dataGebiet === null) {
            AsyncStorage.getItem("dataGebiet")
                .then((data) => {
                    if (data) {
                        setDataGebiet(JSON.parse(data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (dataZeiten === null) {
            AsyncStorage.getItem("dataZeiten")
                .then((data) => {
                    if (data) {
                        setDataZeiten(JSON.parse(data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

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
                        createDeliverer(
                            structureRegData(dataPerson, dataFahrzeug, dataGebiet, dataZeiten)
                        )
                            .then((result) => {
                                setRegistered("smile");
                                AsyncStorage.setItem("registered", "true");
                                resolve(result);
                            })
                            .catch((err) => reject(err));
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
                        AsyncStorage.setItem("dataPerson", JSON.stringify(data));
                    }
                },
                storeDataFahrzeug: (data) => {
                    if (data) {
                        setDataFahrzeug(data);
                        AsyncStorage.setItem("dataFahrzeug", JSON.stringify(data));
                    }
                },
                storeDataGebiet: (data) => {
                    if (data) {
                        setDataGebiet(data);
                        AsyncStorage.setItem("dataGebiet", JSON.stringify(data));
                    }
                },
                storeDataZeiten: (data) => {
                    if (data) {
                        setDataZeiten(data);
                        AsyncStorage.setItem("dataZeiten", JSON.stringify(data));
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
