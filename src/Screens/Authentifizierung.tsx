import React, {useContext} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {TourSuche} from "./TourSuche";

export const Authentifizierung = ({navigation}) => {
    const {tour, currentStop, nextStop, resetTour} = useContext(TourContext);
    if (!tour) {
        return <TourSuche navigation={navigation} />;
    } else {
        return (
            <View style={styles.container}>
                <Header text="Authentifizierung" color="#729628" containerStyle={styles.header} />
                <View style={styles.content}>
                    <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 30}}>
                        <Text style={[styles.zielText, {fontWeight: "bold"}]}>
                            {tour.stops[currentStop].firstName} {tour.stops[currentStop].lastName}
                        </Text>
                        <Text style={[styles.zielText, {paddingTop: 5}]}>
                            {tour.stops[currentStop].streetName}
                        </Text>
                        <Text style={[styles.zielText]}>
                            Nr. {tour.stops[currentStop].streetNumber}
                        </Text>
                        <Text style={[styles.zielText]}>
                            {tour.stops[currentStop].zip + " " + tour.stops[currentStop].city}
                        </Text>
                    </View>
                    <View style={styles.buttonWrap}>
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
                        <Button
                            buttonStyle={styles.buttonGrey}
                            titleStyle={styles.buttonGreyTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Paket nicht zustellbar"
                            onPress={() => {
                                if (currentStop < tour.stops.length - 1) {
                                    nextStop();
                                    navigation.navigate("Ziel");
                                } else {
                                    resetTour(navigation);
                                    navigation.navigate("TourSuche");
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
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
    buttonWrap: {
        flex: 4,
        alignSelf: "center",
        width: "80%",
        justifyContent: "flex-end",
        paddingBottom: "20%",
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
    buttonGrey: {
        backgroundColor: "transparent",
        height: 50,
        width: "100%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        borderColor: "#aaa",
        borderWidth: 2,
    },
    buttonGreyTitle: {
        color: "#aaa",
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
