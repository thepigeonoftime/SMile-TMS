import {createStackNavigator} from "@react-navigation/stack";
import React, {useEffect, useContext, useState} from "react";
import {Authentifizierung} from "./Screens/Authentifizierung";
import {CodeScanner} from "./Screens/CodeScanner";
import {Maps} from "./Screens/Maps";
import {PaketeLaden} from "./Screens/PaketeLaden";
import {Signature} from "./Screens/Signature";
import {TourStart} from "./Screens/TourStart";
import {TourSuche} from "./Screens/TourSuche";
import {Ziel} from "./Screens/Ziel";
import {TourStackProps} from "./Types";
import {AsyncStorage, ImageBackground} from "react-native";
import {TourContext} from "./TourProvider";
import {Center} from "./Center";
import {ActivityIndicator} from "react-native-paper";

const Stack = createStackNavigator<TourStackProps>();

export const TourStack = ({navigation, route}) => {
    const {tour, setTour} = useContext(TourContext);
    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState<"TourSuche" | "TourStart">("TourSuche");

    useEffect(() => {
        const routeName = route.state ? route.state.routes[route.state.index].name : "";
        const hideTabScreens = ["Signature", "CodeScanner"];
        navigation.setOptions({
            tabBarVisible: hideTabScreens.includes(routeName) ? false : true,
        });
    });

    useEffect(() => {
        if (!tour) {
            AsyncStorage.getItem("tour")
                .then((tourObject) => {
                    console.log("tour load");
                    if (tourObject) {
                        setTour(JSON.parse(tourObject));
                        setInitialRoute("TourStart");
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
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

    return (
        <Stack.Navigator mode="card" headerMode="none" initialRouteName={initialRoute}>
            <Stack.Screen name="TourSuche" component={TourSuche} options={{}} />
            <Stack.Screen name="TourStart" component={TourStart} options={{}} />
            <Stack.Screen name="Maps" component={Maps} options={{}} />
            <Stack.Screen name="PaketeLaden" component={PaketeLaden} options={{}} />
            <Stack.Screen name="Ziel" component={Ziel} options={{}} />
            <Stack.Screen name="Authentifizierung" component={Authentifizierung} options={{}} />
            <Stack.Screen name="CodeScanner" component={CodeScanner} options={{}} />
            <Stack.Screen name="Signature" component={Signature} options={{}} />
        </Stack.Navigator>
    );
};
