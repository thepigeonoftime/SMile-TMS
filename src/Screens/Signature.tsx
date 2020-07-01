import ExpoPixi from "expo-pixi";
import * as ScreenOrientation from "expo-screen-orientation";
import React, {useContext, useEffect, useRef, useState} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {captureRef} from "react-native-view-shot";
import type {ViewStyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {TourSuche} from "./TourSuche";

export const Signature = ({navigation}) => {
    console.disableYellowBox = true;
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    const {tour, currentStop, nextStop, finishTour, deliverPacket} = useContext(TourContext);
    const [dynStyles, setDynStyles] = useState<ViewStyleProp>(portrait);
    const [hasSignature, setHasSignature] = useState<boolean>(true);
    const signatureRef = useRef(null);

    const orientationChange = async () => {
        // detect current orientation, apply corresponding styles
        const orientation = await ScreenOrientation.getOrientationAsync();
        if (orientation === 1) {
            signatureRef.current && signatureRef.current.clear();
            setHasSignature(false);
            setDynStyles(portrait);
        } else {
            signatureRef.current && signatureRef.current.clear();
            setHasSignature(false);
            setDynStyles(landscape);
        }
    };

    useEffect(() => {
        ScreenOrientation.unlockAsync();
        ScreenOrientation.addOrientationChangeListener(orientationChange);
        orientationChange();
    }, []);

    const onCancel = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        navigation.goBack();
    };

    const onSubmit = async () => {
        const signature = await captureRef(signatureRef, {
            result: "base64",
        });
        deliverPacket(signature);
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        if (currentStop < tour.stops.length - 1) {
            nextStop();
            navigation.navigate("Ziel");
        } else {
            finishTour(navigation);
        }
    };
    if (!tour) {
        return <TourSuche navigation={navigation} />;
    } else {
        return (
            <View style={dynStyles.container}>
                <Header
                    text="Unterschrift"
                    color="#729628"
                    bgColor="transparent"
                    containerStyle={dynStyles.header}
                    textStyle={dynStyles.headerText}
                />
                {/* <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    signatureRef.current.clear();
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
                            ref={signatureRef}
                            style={styles.pixi}
                            strokeColor={"blue"}
                            strokeAlpha={1}
                            onChange={() => setHasSignature(true)}
                            // onReady={this.onReady}
                        />
                    </View>
                    <View style={dynStyles.buttonWrap}>
                        <Button
                            buttonStyle={[styles.buttonBlue, dynStyles.buttonBlue]}
                            titleStyle={styles.buttonBlueTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={!hasSignature}
                            title="Signatur speichern"
                            onPress={onSubmit}
                        />
                        <Button
                            buttonStyle={[styles.buttonGrey, dynStyles.buttonGrey]}
                            titleStyle={styles.buttonGreyTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Abbrechen"
                            onPress={onCancel}
                        />
                    </View>
                    <View style={dynStyles.bottom} />
                </View>
            </View>
        );
    }
};

// tslint:disable:no-unused-styles

const portrait = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#F2F2F2",
    },
    header: {
        flex: 1,
        paddingLeft: "10%",
        marginTop: 15,
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
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#FFF",
    },
    header: {
        display: "none",
        flex: 0,
        opacity: 0,
        height: 0,
        padding: 0,
        margin: 0,
        backgroundColor: "#FFF",
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
