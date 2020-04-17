import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Center} from "../Center";
import {MapsProps} from "../Types";

const Stack = createStackNavigator<MapsProps>();

const MapsView = ({navigation}) => {
    return (
        <Center>
            <Text>Maps</Text>
            <TouchableOpacity onPress={navigation.goBack}>
                <Text style={{marginTop: 50, color: "blue"}}>Zurück</Text>
            </TouchableOpacity>
        </Center>
    );
};

export const Maps: React.FC<{}> = ({}) => {
    return (
        <Stack.Navigator
            initialRouteName="Maps"
            screenOptions={{
                header: () => null,
            }}
        >
            <Stack.Screen options={{title: "Karte"}} name="Maps" component={MapsView} />
        </Stack.Navigator>
    );
};
