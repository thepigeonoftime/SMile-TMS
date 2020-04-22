import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";

export const Offline = () => {
    const netInfo = useNetInfo();

    if (netInfo.isConnected) {
        console.log("connected");
    }

    return (
        <View style={{padding: 20}}>
            <Text>Type: {netInfo.type}</Text>
            <Text>Connected: {netInfo.isConnected.toString()}</Text>
        </View>
    );
};
