import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {ZielView} from "./Screens/ZielView";
import {TourListe} from "./Screens/TourListe";
import {Navigation} from "./Screens/Navigation";
import {ZielStackProps} from "./Types";

const Stack = createStackNavigator<ZielStackProps>();

export const ZielStack = () => {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="ZielView" component={ZielView} options={{}} />
            <Stack.Screen name="Navigation" component={Navigation} options={{}} />
            <Stack.Screen name="TourListe" component={TourListe} options={{}} />
        </Stack.Navigator>
    );
};
