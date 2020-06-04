import {BarCodeScanner} from "expo-barcode-scanner";
import {Camera} from "expo-camera";
import React, {useContext, useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";

const {width} = Dimensions.get("window");
const qrSize = width * 0.7;

export const PaketeScannen = ({navigation}) => {
    const {tour, reportPickup, setStop} = useContext(TourContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanBackground, setScanBackground] = useState("#FFF");
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [finished, setFinished] = useState(false);
    const packets = [];

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
        tour.packets.map((packet) => {
            packets.push(packet.sscc);
        });
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        const sscc = "urn:epc:id:sscc:" + data;
        packets.map((packet) => {
            console.log("packet:", packet);
            console.log("data:", sscc);
            if ("urn:epc:id:sscc:" + data === packet) {
                packets.splice(packets.indexOf(packet, 1));
            }
        });
        if (!packets.length) {
            setFinished(true);
        }
    };

    const onSubmit = () => {
        setStop(1);
        navigation.navigate("Ziel");
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{flex: 1}}>
            <Header
                text="Pakete Scannen"
                color="#729628"
                containerStyle={{
                    // flex: 0.15,
                    paddingLeft: "10%",
                    paddingTop: "10%",
                    alignItems: "flex-start",
                    height: 100,
                    // paddingBottom: "4%",
                    backgroundColor: "#F2F2F2",
                }}
            />
            <View style={styles.container}>
                <View style={styles.scannerContainer}>
                    <Camera
                        style={styles.scanner}
                        type={type}
                        onBarCodeScanned={handleBarCodeScanned}
                        autoFocus={"on"}
                        ratio="4:3"
                    />

                    <View style={styles.buttonContainer}>
                        {finished && (
                            <Button
                                buttonStyle={styles.button}
                                title="Tour Starten"
                                onPress={onSubmit}
                            />
                        )}
                        <TouchableOpacity onPress={onSubmit}>
                            <Text>skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 25,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.05,
        shadowRadius: 1.0,
        elevation: 2,
        justifyContent: "center",
    },
    scannerContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
        height: "50%",
        marginTop: "10%",
    },
    scanner: {
        backgroundColor: "#ecf0f1",
        padding: 8,
        borderRadius: 30,
        width: "90%",
        height: "50%",
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: "5%",
        width: "100%",
    },
    button: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: 200,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
