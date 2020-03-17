import React, { useState } from "react";
import { Button, FlatList, Text, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MapsProps } from "./Types";
import { Center } from "./Center";
import MapView, { UrlTile } from "react-native-maps";


const Stack = createStackNavigator < MapsProps > ();

const MapsView = ({ navigation }) => {
    let region = {
        latitude: 52.5200,
        longitude: 13.4050,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05,
    };

    const HERE_APPID = "pbHofeJ8BquSqxLG3K26";
    const HERE_APIKEY = "x-6Yvgvamvf-dT0n4YSJetgNX7BxHKSCgdjN-jDS76M";
    const tileUrl = "https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day13/4400/2686/256/png8" +
    "?app_id=" + HERE_APPID + "&app_code=" + HERE_APIKEY;

    return (
      <MapView style={{ flex: 1 }} initialRegion={region} provider={null}
      mapType={Platform.OS === "android" ? "none" : "standard"}>
        <UrlTile urlTemplate={tileUrl} maximumZ={19} />
      </MapView>
     );
};

export const Maps: React.FC < {} > = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Maps">
      <Stack.Screen options={{title: "Karte"}} name="Maps" component={MapsView} />
    </Stack.Navigator>
    );
};
