import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {QRCode} from "react-native-custom-qr-codes-expo";
import {Center} from "../Center";
import {GeneratorProps} from "../Types";

const Stack = createStackNavigator<GeneratorProps>();

const GeneratorView = ({navigation}) => {
    let content = "smile QR Code test";
    return (
        <Center>
            <QRCode codeStyle="square" content={content} size={300} />
        </Center>
    );
};

export const CodeGenerator: React.FC<{}> = ({}) => {
    return (
        <Stack.Navigator
            initialRouteName="CodeGenerator"
            screenOptions={{
                header: () => null,
            }}
        >
            <Stack.Screen
                options={{title: "QR Generator"}}
                name="CodeGenerator"
                component={GeneratorView}
            />
        </Stack.Navigator>
    );
};
