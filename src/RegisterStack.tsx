import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Register} from "./Register";
import {RegisterFahrzeug} from "./RegisterFahrzeug";
import {RegisterGebietPreis} from "./RegisterGebietPreis";
import {RegisterPerson} from "./RegisterPerson";

function RegisterArbeitszeiten({navigation}) {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize: 30}}>Arbeitszeiten</Text>
            <Button onPress={() => navigation.goBack()} title="Zurück" />
        </View>
    );
}

const Stack = createStackNavigator();

export const RegisterStack = () => {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="Register" component={Register} options={{}} />
            <Stack.Screen name="RegisterPerson" component={RegisterPerson} />
            <Stack.Screen name="RegisterFahrzeug" component={RegisterFahrzeug} />
            <Stack.Screen name="RegisterGebietPreis" component={RegisterGebietPreis} />
            <Stack.Screen
                name="RegisterArbeitszeiten"
                component={RegisterArbeitszeiten}
            />
        </Stack.Navigator>
    );
};
