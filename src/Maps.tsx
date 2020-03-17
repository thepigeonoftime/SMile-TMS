import React, { useState } from "react";
import { Button, FlatList, Text, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MapsProps } from "./Types";
import { Center } from "./Center";
import MapView, { UrlTile } from "react-native-maps";


const Stack = createStackNavigator < MapsProps > ();

const MapsView = ({ navigation }) => {
return (
  <MapView> </MapView>
  );
};

export const Maps: React.FC < {} > = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Maps">
      <Stack.Screen options={{title: "Karte"}} name="Maps" component={MapsView} />
    </Stack.Navigator>
    );
};
