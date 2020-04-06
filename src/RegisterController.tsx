import {useContext, useEffect} from "react";
import {AsyncStorage} from "react-native";
import {RegisterContext} from "./RegisterProvider";

export const RegisterController = ({children}) => {
    let {registered, register, unregister} = useContext(RegisterContext);

    useEffect(() => {
        AsyncStorage.getItem("registered")
            .then((registerString) => {
                if (registerString) {
                    console.log(registerString);
                    register();
                } else {
                    unregister();
                }
                console.log("registered: " + registered);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return children;
};
