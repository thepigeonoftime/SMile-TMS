import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {TourStart} from "./Screens/TourStart";
import {TourSuche} from "./Screens/TourSuche";
import {TourStackProps} from "./Types";
import {Maps} from "./Screens/Maps";
import {PaketeLaden} from "./Screens/PaketeLaden";
import {ZielView} from "./Screens/ZielView";

const Stack = createStackNavigator<TourStackProps>();

export const TourStack = () => {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="TourSuche" component={TourSuche} options={{}} />
            <Stack.Screen name="TourStart" component={TourStart} options={{}} />
            <Stack.Screen name="Maps" component={Maps} options={{}} />
            <Stack.Screen name="PaketeLaden" component={PaketeLaden} options={{}} />
            <Stack.Screen name="ZielView" component={ZielView} options={{}} />
        </Stack.Navigator>
    );
};
