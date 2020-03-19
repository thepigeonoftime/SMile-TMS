import React, { useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { ScannerProps } from "./Types";
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Center } from "./Center";

const Stack = createStackNavigator < ScannerProps > ();

const ScannerView = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
    );
};


export const CodeScanner: React.FC < {} > = ({}) => {
    return (
        <Stack.Navigator initialRouteName="CodeScanner">
      <Stack.Screen options={{title: "Bar Code Scanner"}} name="CodeScanner" component={ScannerView} />
    </Stack.Navigator>
    );
};