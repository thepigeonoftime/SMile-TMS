import {BarCodeScanner} from "expo-barcode-scanner";
import {Camera} from "expo-camera";
import React, {useContext, useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Animated, Easing} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {useAnimation} from "react-native-animation-hooks";
import BarcodeMask from "react-native-barcode-mask";
import {Center} from "../Center";

export const PaketeScannen = ({navigation}) => {
    const {tour, reportPickup, setStop} = useContext(TourContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scannedPackets, setScannedPackets] = useState(0);
    const [scanned, setScanned] = useState(false);
    const [scanMsg, setScanMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [packets, setPackets] = useState([]);
    const [packetLen, setPacketLen] = useState(0);
    const [finished, setFinished] = useState(false);
    const [scanColor, setScanColor] = useState("255,255,255");
    const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(0));

    const tourPackets = tour.packets.map((packet) => {
        return packet.propID;
    });

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
            if (status === "granted") {
                setPackets(tourPackets);
                setPacketLen(tourPackets.length);
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            }
        })();
    }, []);

    const showScanMsg = (msg) => {
        setScanMsg(msg);
        setTimeout(() => {
            setScanMsg("");
        }, 5000);
    };

    const showScanColor = (color) => {
        animatedOpacity.setValue(0);
        setScanColor(color);
        Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            // animatedOpacity.setValue(0);
        });
    };

    const handleBarCodeScanned = ({type, data}) => {
        console.log("barcode type:", type);
        console.log(data);
        console.log(packets);
        setScanned(true);
        setTimeout(() => {
            setScanned(false);
        }, 1000);
        const packetBuffer = [];
        packets.forEach((packet) => {
            if (data === packet) {
                reportPickup(packet.sscc, new Date().toJSON());
                showScanColor("0,255,0");
                setScannedPackets(scannedPackets + 1);
            } else {
                packetBuffer.push(packet);
            }
        });
        if (!tourPackets.includes(data)) {
            showScanColor("255,0,0");
            showScanMsg("Unbekanntes Paket oder Code");
        }
        // else {
        //     showScanMsg("Paket bereits gescannt!");
        // }
        if (!packetBuffer.length) {
            setFinished(true);
        }
        setScannedPackets(-(-tourPackets.length + packetBuffer.length)); // multiple packages same propID workaround
        setPackets(packetBuffer);
    };

    const onSubmit = () => {
        setStop(0);
        navigation.navigate("Ziel");
    };

    return (
        <View style={{flex: 1}}>
            <Header
                text="Pakete Scannen"
                color="#729628"
                containerStyle={{
                    flex: 0.2,
                    paddingLeft: "10%",

                    alignItems: "flex-start",
                    height: 100,
                    backgroundColor: "#F2F2F2",
                }}
                textStyle={{
                    paddingTop: "10%",
                    // paddingBottom: "4%",
                }}
            />
            <View style={styles.container}>
                {!hasPermission && (
                    <View style={styles.permissionWarning}>
                        <Text style={{fontSize: 18}}>
                            Kamera Berechtigung benötigt zum scannen der Pakete.
                        </Text>
                        <Text>{"\n"}</Text>
                        <Text>Bitte erteilen Sie diese in den Einstellungen.</Text>
                    </View>
                )}
                {hasPermission && (
                    <View style={{alignItems: "center"}}>
                        <Animated.View
                            style={[
                                styles.scannerContainer,
                                {
                                    borderColor: animatedOpacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [
                                            `rgba( ${scanColor}, 1)`,
                                            `rgba(255,255,255, 1)`,
                                        ],
                                    }),
                                },
                            ]}
                        >
                            {!loading && (
                                <Camera
                                    style={styles.scanner}
                                    type={Camera.Constants.Type.back}
                                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    autoFocus={"on"}
                                >
                                    <BarcodeMask
                                        edgeBorderWidth={0}
                                        width="100%"
                                        height="70%"
                                        backgroundColor="transparent"
                                        lineAnimationDuration={1500}
                                    />
                                </Camera>
                            )}
                        </Animated.View>
                        <View style={styles.scanStatusWrap}>
                            <Text style={styles.scanStatus}>
                                {scannedPackets} von {packetLen} Paketen gescannt
                            </Text>
                        </View>
                        <View style={styles.scanMsgContainer}>
                            <Text style={styles.scanMsg}>{scanMsg}</Text>
                        </View>
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
                )}
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
        // justifyContent: "center",
        // alignItems: "center",
    },
    permissionWarning: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "5%",
        marginTop: -100,
    },
    scannerContainer: {
        // flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        overflow: "hidden",
        width: "98%",
        height: "70%",
        marginTop: "3%",
        borderWidth: 10,
    },
    scanner: {
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#ecf0f1",
        padding: 8,
        // borderRadius: 30,
        width: "100%",
        height: "150%",
    },
    scanStatusWrap: {
        justifyContent: "center",
        alignItems: "center",
    },
    scanStatus: {
        fontSize: 16,
        color: "#777",
    },
    scanMsgContainer: {
        paddingTop: "5%",
        alignItems: "center",
    },
    scanMsg: {
        color: "#ffb600",
        fontWeight: "bold",
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        // marginTop: "5%",
        width: "100%",
        height: "140%",
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
