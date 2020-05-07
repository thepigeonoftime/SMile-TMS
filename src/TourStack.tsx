import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {TourStart} from "./Screens/TourStart";
import {TourSuche} from "./Screens/TourSuche";
import {TourStackProps} from "./Types";
import {Maps} from "./Screens/Maps";
import {PaketeLaden} from "./Screens/PaketeLaden";
import {Ziel} from "./Screens/Ziel";
import {Authentifizierung} from "./Screens/Authentifizierung";
import {CodeScanner} from "./Screens/CodeScanner";
import {Signature} from "./Screens/Signature";

const Stack = createStackNavigator<TourStackProps>();

export const TourStack = () => {
    return (
        <Stack.Navigator mode="card" headerMode="none">
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
