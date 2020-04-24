import React, {useState, useRef, useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {SignatureProps} from "../Types";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import ExpoPixi from "expo-pixi";
import {captureRef} from "react-native-view-shot";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {Button} from "react-native-elements";

const Stack = createStackNavigator<SignatureProps>();

export const Signature = ({navigation}) => {
    const {tour, saveSignature} = useContext(TourContext);
    let signature = useRef(null);
    const onSubmit = async () => {
        const uri = await captureRef(signature, {format: "jpg", quality: 0.4});
        saveSignature(uri);
        console.log(uri);
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <Header
                text="Unterschrift"
                color="#729628"
                containerStyle={styles.header}
                textStyle={styles.headerText}
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
                        {tour.tours[0].stops[1].firstName} {tour.tours[0].stops[1].lastName}
                    </Text>
                </View>
                <View style={styles.pixiWrap}>
                    <ExpoPixi.Signature
                        ref={signature}
                        style={styles.pixi}
                        strokeColor={"blue"}
                        strokeAlpha={1}
                        // onReady={this.onReady}
                    />
                </View>
                <View style={styles.buttonWrap}>
                    <Button
                        buttonStyle={styles.buttonBlue}
                        titleStyle={styles.buttonBlueTitle}
                        disabledStyle={styles.buttonDisabled}
                        disabled={false}
                        title="Signatur speichern"
                        onPress={onSubmit}
                    />
                    <Button
                        buttonStyle={styles.buttonGrey}
                        titleStyle={styles.buttonGreyTitle}
                        disabledStyle={styles.buttonDisabled}
                        disabled={false}
                        title="Abbrechen"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                </View>
                <View style={styles.bottom} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
    },
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
    },
    pixiWrap: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    pixi: {
        flex: 1,
        // backgroundColor: "#FFF",
        borderWidth: 0,
        borderColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        borderRadius: 35,
    },
    buttonWrap: {
        paddingTop: 40,
        paddingHorizontal: 40,
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
    bottom: {
        flex: 0.4,
    },
});
