import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Register} from "./Register";

function RegisterPerson({navigation}) {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize: 30}}>Persönliche Informationen</Text>
            <Button onPress={() => navigation.goBack()} title="Zurück" />
        </View>
    );
}

function RegisterFahrzeug({navigation}) {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize: 30}}>Fahrzeuginformationen</Text>
            <Button onPress={() => navigation.goBack()} title="Zurück" />
        </View>
    );
}

function RegisterGebietPreis({navigation}) {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize: 30}}>Gebiet & Preis</Text>
            <Button onPress={() => navigation.goBack()} title="Zurück" />
        </View>
    );
}

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
            <Stack.Screen name="infoPerson" component={RegisterPerson} />
            <Stack.Screen name="infoFahrzeug" component={RegisterFahrzeug} />
            <Stack.Screen name="infoGebietPreis" component={RegisterGebietPreis} />
            <Stack.Screen name="infoArbeitszeiten" component={RegisterArbeitszeiten} />
        </Stack.Navigator>
    );
};
