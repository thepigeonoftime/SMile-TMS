import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {Register} from "./Screens/Register";
import {RegisterZeiten} from "./Screens/RegisterZeiten";
import {RegisterFahrzeug} from "./Screens/RegisterFahrzeug";
import {RegisterGebietPreis} from "./Screens/RegisterGebietPreis";
import {RegisterPerson} from "./Screens/RegisterPerson";
import {RegisterStackProps} from "./Types";

const Stack = createStackNavigator<RegisterStackProps>();

export const RegisterStack = ({navigation, route}) => {
    navigation.setOptions({
        tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
    });
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="Register" component={Register} options={{}} />
            <Stack.Screen name="RegisterPerson" component={RegisterPerson} />
            <Stack.Screen name="RegisterFahrzeug" component={RegisterFahrzeug} />
            <Stack.Screen name="RegisterGebietPreis" component={RegisterGebietPreis} />
            <Stack.Screen name="RegisterZeiten" component={RegisterZeiten} />
        </Stack.Navigator>
    );
};
