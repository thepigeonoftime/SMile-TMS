import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {Center} from "../Center";
import {Button} from "react-native";
import {CodeScanner} from "./CodeScanner";
import {CodeGenerator} from "./CodeGenerator";
import {QRTestProps} from "../Types";

const Stack = createStackNavigator<QRTestProps>();

const QRTestView = ({navigation}) => {
    let content = "smile QR Code test";
    return (
        <Center>
            <Button
                title="QR Scanner"
                onPress={() => {
                    navigation.navigate("QRScan");
                }}
            />
            <Button
                title="QR Generator"
                onPress={() => {
                    navigation.navigate("QRGenerator");
                }}
            />
        </Center>
    );
};

export const QRTest: React.FC<{}> = ({}) => {
    return (
        <Stack.Navigator initialRouteName="QRTest">
            <Stack.Screen options={{title: "QR Code"}} name="QRTest" component={QRTestView} />
            <Stack.Screen options={{title: "QR Scanner"}} name="QRScan" component={CodeScanner} />
            <Stack.Screen
                options={{title: "QR Generator"}}
                name="QRGenerator"
                component={CodeGenerator}
            />
        </Stack.Navigator>
    );
};
