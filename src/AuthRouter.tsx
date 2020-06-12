import {NavigationContainer} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, {useContext, useEffect, useState} from "react";
import {View} from "react-native";
import {AppContainer} from "./AppContainer";
import {AuthContext} from "./AuthProvider";
import {AuthStack} from "./AuthStack";

export const AuthRouter: React.FC<{}> = ({}) => {
    const {token, storeToken} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SecureStore.getItemAsync("token")
            .then((token) => {
                if (token) {
                    storeToken(token);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <View>{/* Splash Screen */}</View>;
    }
    // route to AppContainer if JWT token is set, otherwise show AuthStack
    return <NavigationContainer>{token ? <AppContainer /> : <AuthStack />}</NavigationContainer>;
};
