import {NavigationContainer} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, {useContext, useEffect, useState} from "react";
import {View, ImageBackground, ActivityIndicator, AsyncStorage} from "react-native";
import {AppContainer} from "./AppContainer";
import {AuthContext} from "./AuthProvider";
import {AuthStack} from "./AuthStack";
import {Center} from "./Center";
import moment from "moment";

export const AuthRouter: React.FC<{}> = ({}) => {
    const {token, storeToken, removeToken} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // get current token, current date and expiry date -> set token if still valid, otherwise delete
                const currentToken = await SecureStore.getItemAsync("token");
                const tokenExpiry = await SecureStore.getItemAsync("tokenExpiry");
                const currentDate = moment();
                if (currentToken && tokenExpiry && currentDate.isBefore(tokenExpiry)) {
                    storeToken(currentToken);
                } else {
                    removeToken();
                }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <ImageBackground source={require("../assets/splash.png")} style={{flex: 1}}>
                <Center>
                    <ActivityIndicator size="small" color="#FFF" />
                </Center>
            </ImageBackground>
        );
    }
    // route to AppContainer if JWT token is set, otherwise show AuthStack
    return <NavigationContainer>{token ? <AppContainer /> : <AuthStack />}</NavigationContainer>;
};
