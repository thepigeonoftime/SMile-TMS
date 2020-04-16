import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {TourStart} from "./Screens/TourStart";
import {TourSuche} from "./Screens/TourSuche";
import {TourStackProps} from "./Types";

const Stack = createStackNavigator<TourStackProps>();

export const TourStack = () => {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="TourSuche" component={TourSuche} options={{}} />
            <Stack.Screen name="TourStart" component={TourStart} options={{}} />
        </Stack.Navigator>
    );
};
