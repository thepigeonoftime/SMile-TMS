import React, {useState, useEffect} from "react";
import {AsyncStorage} from "react-native";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {structureRegData, CREATE_DELIVERER} from "./Requests";
import {
    RegisterContextProps,
    dataPersonProps,
    dataFahrzeugProps,
    dataGebietProps,
    dataZeitenProps,
} from "./Types";

export const RegisterContext = React.createContext<RegisterContextProps>({
    loading: true,
    registered: null,
    dataPerson: null,
    dataFahrzeug: null,
    dataGebiet: null,
    dataZeiten: null,
    showRegModal: false,
    register: () => true,
    unregister: () => true,
    registration: () => true,
    storeDataPerson: (data, toStorage) => true,
    storeDataFahrzeug: (data, toStorage) => true,
    storeDataGebiet: (data, toStorage) => true,
    storeDataZeiten: (data, toStorage) => true,
    toggleRegModal: () => true,
});

interface RegisterProviderProps {}
export const RegisterProvider: React.FC<RegisterProviderProps> = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [registered, setRegistered] = useState<string | null>(null);
    const [dataPerson, setDataPerson] = useState<dataPersonProps | null>(null);
    const [dataFahrzeug, setDataFahrzeug] = useState<dataFahrzeugProps | null>(null);
    const [dataGebiet, setDataGebiet] = useState<dataGebietProps | null>(null);
    const [dataZeiten, setDataZeiten] = useState<dataZeitenProps | null>(null);
    const [showRegModal, setShowRegModal] = useState<boolean>(false);
    const [createDeliverer] = useMutation(CREATE_DELIVERER);

    useEffect(() => {
        // register by default for testing
        setRegistered("smile");
        AsyncStorage.getItem("registered")
            .then((registerString) => {
                if (registerString) {
                    setRegistered("smile");
                }
                setLoading(false);
                console.log("registered: " + registered);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <RegisterContext.Provider
            value={{
                loading,
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
                            .then(({data, errors}) => {
                                if (errors && errors[0]) {
                                    console.log("graphql error:", errors[0].message);
                                    reject(errors[0]);
                                } else {
                                    setRegistered("smile");
                                    AsyncStorage.setItem("registered", "true");
                                    resolve(data);
                                }
                            })
                            .catch((err) => reject(err));
                    });
                },
                register: () => {
                    setRegistered("smile");
                    AsyncStorage.setItem("registered", "true");
                    console.log(registered);
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
                storeDataPerson: (data, toStorage) => {
                    if (data) {
                        setDataPerson(data);
                        toStorage && AsyncStorage.setItem("dataPerson", JSON.stringify(data));
                    }
                },
                storeDataFahrzeug: (data, toStorage) => {
                    if (data) {
                        setDataFahrzeug(data);
                        toStorage && AsyncStorage.setItem("dataFahrzeug", JSON.stringify(data));
                    }
                },
                storeDataGebiet: (data, toStorage) => {
                    if (data) {
                        setDataGebiet(data);
                        toStorage && AsyncStorage.setItem("dataGebiet", JSON.stringify(data));
                    }
                },
                storeDataZeiten: (data, toStorage) => {
                    if (data) {
                        setDataZeiten(data);
                        toStorage && AsyncStorage.setItem("dataZeiten", JSON.stringify(data));
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
