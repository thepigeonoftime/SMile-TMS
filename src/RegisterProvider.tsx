import React, {useState} from "react";
import {AsyncStorage} from "react-native";

type registerType = null | string;

export const RegisterContext = React.createContext<{
    registered: registerType;
    register: () => void;
    unregister: () => void;
}>({
    registered: null,
    register: () => {},
    unregister: () => {}
});

interface RegisterProviderProps {}
export const RegisterProvider: React.FC<RegisterProviderProps> = ({children}) => {
    const [registered, setRegistered] = useState<registerType>("smile");
    return (
        <RegisterContext.Provider
            value={{
                registered,
                register: () => {
                    setRegistered("smile");
                    AsyncStorage.setItem("registered", "true");
                    console.log("registered");
                },
                unregister: () => {
                    setRegistered(null);
                    AsyncStorage.removeItem("registered");
                    console.log("unregistered");
                }
            }}>
            {children}
        </RegisterContext.Provider>
    );
};
