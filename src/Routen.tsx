import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RoutenProps } from "./Types";
import { Button, FlatList, Text } from "react-native";
import { Center } from "./Center";

const Stack = createStackNavigator<RoutenProps>();

const RoutenView = ({ navigation }) => {
  return (
    <Center>
    <Text> Routen </Text>
    </Center>
  );
};

export const Routen: React.FC<{}> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Routen">
      <Stack.Screen options={{title: "Routen"}} name="Routen" component={RoutenView} />
    </Stack.Navigator>
  );
};
