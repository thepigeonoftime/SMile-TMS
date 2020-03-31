import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage, View } from "react-native";
import { AppStack } from "./AppStack";
import { RegisterContext, RegisterProvider } from "./RegisterProvider";
import { RegisterStack } from "./RegisterStack";

export const RegisterRouter: React.FC<{}> = ({ }) => {
    let { registered, register, unregister } = useContext(RegisterContext);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return (
            <View>
                { /* Splash Screen */}
            </View>
        );
    }

    return (
        <RegisterProvider>
            {registered ? <AppStack /> : <RegisterStack />}
        </RegisterProvider>
    );
};
