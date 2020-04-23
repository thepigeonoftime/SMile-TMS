import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {ZielView} from "./Screens/ZielView";
import {ZielStackProps} from "./Types";

const Stack = createStackNavigator<ZielStackProps>();

export const ZielStack = () => {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="ZielView" component={ZielView} options={{}} />
        </Stack.Navigator>
    );
};
