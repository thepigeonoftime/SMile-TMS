import React, {useState, useRef, useContext, useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {SignatureProps} from "../Types";
import {Text, TouchableOpacity, View, StyleSheet, SafeAreaView} from "react-native";
import ExpoPixi from "expo-pixi";
import {captureRef} from "react-native-view-shot";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {Button} from "react-native-elements";
import {ScreenOrientation} from "expo";
import {TourSuche} from "./TourSuche";

export const Signature = ({navigation}) => {
    console.disableYellowBox = true;
    const {tour, currentStop, currentPacket, nextStop, resetTour, deliverPacket} = useContext(
        TourContext
    );
    const [dynStyles, setDynStyles] = useState<any>(portrait);
    let signature = useRef(null);
    useEffect(() => {
        ScreenOrientation.unlockAsync();
    }, []);

    const detectOrientation = async () => {
        const {orientation} = await ScreenOrientation.getOrientationAsync();
        if (orientation === "PORTRAIT" || orientation === "PORTRAIT_UP") {
            setDynStyles(portrait);
        } else {
            setDynStyles(landscape);
        }
    };

    ScreenOrientation.addOrientationChangeListener(detectOrientation);

    const onSubmit = async () => {
        const sig = await captureRef(signature, {
            result: "base64",
        });
        deliverPacket(sig, currentStop, tour.packets[currentPacket].sscc, tour.tourMetaData.tourID);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        if (currentStop < tour.stops.length - 1) {
            nextStop();
            navigation.navigate("Ziel");
        } else {
            resetTour(navigation);
        }
    };
    if (!tour) {
        return <TourSuche navigation={navigation} />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    text="Unterschrift"
                    color="#729628"
                    containerStyle={dynStyles.header}
                    textStyle={dynStyles.headerText}
                />
                {/* <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    signature.current.clear();
                }}
            >
                <Text>Reset</Text>
            </TouchableOpacity> */}
                <View style={styles.content}>
                    <View style={styles.textWrap}>
                        <Text style={styles.text}>
                            {tour.stops[currentStop].firstName} {tour.stops[currentStop].lastName}
                        </Text>
                    </View>
                    <View style={styles.pixiWrap}>
                        <ExpoPixi.Signature
                            ref={(ref) => (signature = ref)}
                            style={styles.pixi}
                            strokeColor={"blue"}
                            strokeAlpha={1}
                            // onReady={this.onReady}
                        />
                    </View>
                    <View style={dynStyles.buttonWrap}>
                        <Button
                            buttonStyle={[styles.buttonBlue, dynStyles.buttonBlue]}
                            titleStyle={styles.buttonBlueTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Signatur speichern"
                            onPress={onSubmit}
                        />
                        <Button
                            buttonStyle={[styles.buttonGrey, dynStyles.buttonGrey]}
                            titleStyle={styles.buttonGreyTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Abbrechen"
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    </View>
                    <View style={dynStyles.bottom} />
                </View>
            </SafeAreaView>
        );
    }
};

// tslint:disable:no-unused-styles

const portrait = StyleSheet.create({
    header: {
        flex: 1,
        paddingLeft: "10%",
        marginTop: 35,
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 20,
        backgroundColor: "#F2F2F2",
    },
    headerText: {
        paddingTop: "2%",
    },
    buttonWrap: {
        paddingTop: 40,
        paddingHorizontal: 40,
    },
    buttonBlue: {
        width: "100%",
    },
    buttonGrey: {
        width: "100%",
    },
    bottom: {
        flex: 0.4,
    },
});

const landscape = StyleSheet.create({
    header: {
        display: "none",
        flex: 0,
        paddingLeft: "10%",
        // marginTop: 35,
        alignItems: "flex-start",
        justifyContent: "center",
        // marginBottom: 20,
        backgroundColor: "#F2F2F2",
    },
    headerText: {
        paddingTop: 0,
    },
    buttonWrap: {
        flexDirection: "row",
        paddingTop: 20,
        paddingHorizontal: 40,
    },
    buttonBlue: {
        width: "80%",
    },
    buttonGrey: {
        width: "80%",
    },
    bottom: {
        flex: 0.2,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
    },

    content: {
        flex: 10,
        margin: 0,
        // paddingHorizontal: 25,
        // paddingTop: 35,
        borderRadius: 35,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 1.0,
        elevation: 2,
        // marginTop: -50,
    },
    textWrap: {
        paddingTop: 20,
        paddingLeft: 40,
        // paddingBottom: 30,
    },
    text: {
        color: "#333",
        fontSize: 17,
        fontWeight: "500",
    },
    pixiWrap: {
        flex: 2,
        backgroundColor: "#FFF",
    },
    pixi: {
        flex: 2,
        // backgroundColor: "#FFF",
        borderWidth: 0,
        borderColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        borderRadius: 35,
    },
    buttonBlue: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: "100%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    buttonBlueTitle: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "600",
    },
    buttonGrey: {
        backgroundColor: "transparent",
        height: 50,
        width: "100%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        borderColor: "#d7d0c8",
        borderWidth: 2,
    },
    buttonGreyTitle: {
        color: "#d7d0c8",
        fontSize: 22,
        fontWeight: "600",
    },
    buttonDisabled: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#ccc",
    },
});
