import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GeneratorProps } from "./Types";
import { Center } from "./Center";
import { QRCode } from "react-native-custom-qr-codes-expo";


const Stack = createStackNavigator<GeneratorProps>();

const GeneratorView = ({ navigation }) => {
  return (
    <Center>
      <QRCode codeStyle="square" content="smile test" size="300"/>
    </Center>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
  }
});

export const CodeGenerator: React.FC<{}> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="CodeGenerator">
      <Stack.Screen options={{title: "QR Generator"}} name="CodeGenerator" component={GeneratorView} />
    </Stack.Navigator>
  );
};
