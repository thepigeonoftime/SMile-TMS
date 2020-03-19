import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScannerProps } from "./Types";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

const Stack = createStackNavigator < ScannerProps > ();

const ScannerView = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
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
        backgroundColor: "#000",
      }}>
      <BarCodeScanner
        onBarCodeScanned={(scan) => alert(scan.data)}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <BarcodeMask edgeColor={"#62B1F6"} showAnimatedLine={true} />
      </BarCodeScanner>

      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
    </View>
    );
};

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    padding: 0,
    margin: 0,
  },
});


export const CodeScanner: React.FC < {} > = ({}) => {
  return (
    <Stack.Navigator initialRouteName="CodeScanner"
    screenOptions={{
      header: () => null
    }}
    >
    <Stack.Screen options={{title: "Bar Code Scanner"}} name="CodeScanner" component={ScannerView} />
    </Stack.Navigator>
    );
};
