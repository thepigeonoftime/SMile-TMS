import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {Register} from "./Screens/Register";
import {RegisterArbeitsZeiten} from "./Screens/RegisterArbeitsZeiten";
import {RegisterFahrzeug} from "./Screens/RegisterFahrzeug";
import {RegisterGebietPreis} from "./Screens/RegisterGebietPreis";
import {RegisterPerson} from "./Screens/RegisterPerson";

const Stack = createStackNavigator();

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
            <Stack.Screen name="RegisterArbeitszeiten" component={RegisterArbeitsZeiten} />
        </Stack.Navigator>
    );
};
