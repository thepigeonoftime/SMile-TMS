import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {Register} from "./Register";
import {RegisterArbeitsZeiten} from "./RegisterArbeitsZeiten";
import {RegisterFahrzeug} from "./RegisterFahrzeug";
import {RegisterGebietPreis} from "./RegisterGebietPreis";
import {RegisterPerson} from "./RegisterPerson";

const Stack = createStackNavigator();

export const RegisterStack = () => {
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
