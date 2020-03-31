import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage, View } from "react-native";
import { AppStack } from "./AppStack";
import { RegisterContext, RegisterProvider } from "./RegisterProvider";
import { RegisterStack } from "./RegisterStack";


const RegisterLogic: React.FC<{}> = ({ }) => {
    let { registered, register, unregister } = useContext(RegisterContext);
    const Stack = createStackNavigator<{}>();

    useEffect(() => {
        AsyncStorage.removeItem("registered")
        AsyncStorage.getItem("registered")
            .then(registerString => {
                if (registerString) {
                    console.log(registerString);
                    register();
                }
                else {
                    unregister();
                }
                console.log("registered: " + registered);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const RegisterContainer = ({ children }) => {
        return (children);
    };

    return (
        <RegisterContainer>
            {
                registered ? <AppStack /> : <RegisterStack />
            }
        </RegisterContainer>
    )
};

export const RegisterRouter: React.FC<{}> = ({ }) => {
    return (
        <RegisterProvider>
            <RegisterLogic />
        </RegisterProvider>
    );
}


