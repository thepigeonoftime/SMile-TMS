import React, {useContext} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {Navigation} from "./Navigation";
import {TourListe} from "./TourListe";
import {PaketGeben} from "./PaketGeben";

export const Authentifizierung = ({navigation}) => {
    const {tour, toggleTourListe, toggleNavigation, togglePaketGeben} = useContext(TourContext);
    return (
        <View style={styles.container}>
            <Header text="Authentifizierung" color="#729628" containerStyle={styles.header} />
            <View style={styles.content}>
                {/* <View style={{flex: 1, paddingLeft: "10%", paddingTop: "10%"}}> */}
                <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 30}}>
                    <Text style={[styles.zielText, {fontWeight: "bold"}]}>
                        {tour.tours[0].stops[1].firstName} {tour.tours[0].stops[1].lastName}
                    </Text>
                    <Text style={[styles.zielText, {paddingTop: 5}]}>
                        {tour.tours[0].stops[1].streetName}
                    </Text>
                    <Text style={[styles.zielText]}>Nr. {tour.tours[0].stops[1].streetNumber}</Text>
                    <Text style={[styles.zielText]}>
                        {tour.tours[0].stops[1].zip + " " + tour.tours[0].stops[1].city}
                    </Text>
                    {/* </View> */}
                </View>
                <View
                    style={{
                        flex: 4,
                        alignSelf: "center",
                        width: "80%",
                        justifyContent: "flex-end",
                        paddingBottom: "20%",
                    }}
                >
                    <Button
                        buttonStyle={styles.buttonWhite}
                        titleStyle={styles.buttonWhiteTitle}
                        disabledStyle={styles.buttonDisabled}
                        disabled={false}
                        title="Paket Scannen"
                        onPress={() => {
                            navigation.navigate("CodeScanner");
                        }}
                    />
                    <Button
                        buttonStyle={styles.buttonBlue}
                        titleStyle={styles.buttonBlueTitle}
                        disabledStyle={styles.buttonDisabled}
                        disabled={false}
                        title="Unterschreiben"
                        onPress={() => navigation.navigate("Signature")}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: "100%",
    },
    header: {
        flex: 1,
        paddingLeft: "10%",
        marginTop: "13%",
        alignItems: "flex-start",
        justifyContent: "center",
        // paddingBottom: "10%",
        backgroundColor: "#F2F2F2",
    },
    content: {
        flex: 7,
        justifyContent: "center",
        alignItems: "flex-start",
        // paddingTop: "7%",
        // marginBottom: "20%",
        marginTop: "-5%",
        paddingHorizontal: 20,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        backgroundColor: "#FFF",
        height: "50%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.08,
        shadowRadius: 1,
        // elevation: 0,
    },
    buttonWhite: {
        backgroundColor: "#FFF",
        height: 50,
        width: "100%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        borderColor: "#3FA9F5",
        borderWidth: 2,
    },
    buttonWhiteTitle: {
        color: "#3FA9F5",
        fontSize: 22,
        fontWeight: "600",
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
    buttonDisabled: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#ccc",
    },
    zielText: {
        color: "#666",
        fontSize: 20,
    },
});
