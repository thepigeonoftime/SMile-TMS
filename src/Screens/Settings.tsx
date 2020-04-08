import React, {useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {SettingsProps} from "../Types";
import {Button, FlatList, Text} from "react-native";
import {Center} from "../Center";

const Stack = createStackNavigator<SettingsProps>();

const SettingsView = ({navigation}) => {
    return (
        <Center>
            <Text> Einstellungen </Text>
        </Center>
    );
};

export const Settings: React.FC<{}> = ({}) => {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen
                options={{title: "Einstellungen"}}
                name="Settings"
                component={SettingsView}
            />
        </Stack.Navigator>
    );
};
