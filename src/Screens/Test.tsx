import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {Center} from "../Center";
import {Button} from "react-native";
import {CodeScanner} from "./CodeScanner";
import {CodeGenerator} from "./CodeGenerator";
import {QRTestProps} from "../Types";
import {HereMaps} from "./HereMaps";
import {Signature} from "./Signature";
import {Offline} from "./Offline";

const Stack = createStackNavigator();

const TestView = ({navigation}) => {
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
            <Button
                title="Signature"
                onPress={() => {
                    navigation.navigate("Signature");
                }}
            />
            <Button
                title="Maps"
                onPress={() => {
                    navigation.navigate("HereMaps");
                }}
            />
            <Button
                title="Offline"
                onPress={() => {
                    navigation.navigate("Offline");
                }}
            />
        </Center>
    );
};

export const Test: React.FC<{}> = ({}) => {
    return (
        <Stack.Navigator initialRouteName="QRTest">
            <Stack.Screen options={{title: "Test Component"}} name="Test" component={TestView} />
            <Stack.Screen options={{title: "QR Scanner"}} name="QRScan" component={CodeScanner} />
            <Stack.Screen
                options={{title: "Unterschrift"}}
                name="Signature"
                component={Signature}
            />
            <Stack.Screen
                options={{title: "QR Generator"}}
                name="QRGenerator"
                component={CodeGenerator}
            />
            <Stack.Screen options={{title: "Here Maps"}} name="HereMaps" component={HereMaps} />
            <Stack.Screen options={{title: "Offline"}} name="Offline" component={Offline} />
        </Stack.Navigator>
    );
};
