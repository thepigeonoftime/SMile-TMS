import React, {useContext} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {Navigation} from "./Navigation";
import {PaketGeben} from "./PaketGeben";
import {TourListe} from "./TourListe";
import {TourSuche} from "./TourSuche";
import {RFValue} from "react-native-responsive-fontsize";

export const Ziel = ({navigation}) => {
    const {
        tour,
        currentStop,
        nextStop,
        resetTour,
        toggleTourListe,
        toggleNavigation,
        togglePaketGeben,
    } = useContext(TourContext);
    if (!tour) {
        return <TourSuche navigation={navigation} />;
    } else {
        return (
            <View style={{flex: 1}}>
                <Header
                    text="Nächstes Ziel"
                    color="#729628"
                    containerStyle={styles.header}
                    textStyle={{top: 30}}
                />
                <View style={styles.content}>
                    <View style={{flex: 1, paddingLeft: "10%", paddingTop: "7%"}}>
                        <Text style={[styles.zielText, {fontWeight: "bold"}]}>
                            {tour.stops[currentStop].firstName} {tour.stops[currentStop].lastName}
                        </Text>
                        <Text style={[styles.zielText, {fontWeight: "bold"}]}>
                            {tour.stops[currentStop].streetName}
                        </Text>
                        <Text style={[styles.zielText]}>
                            Nummer: {tour.stops[currentStop].streetNumber}
                        </Text>
                        <Text style={[styles.zielText]}>
                            {tour.stops[currentStop].zip + " " + tour.stops[1].city}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 2.8,
                            justifyContent: "flex-start",
                            alignSelf: "center",
                            width: "80%",
                        }}
                    >
                        <Button
                            buttonStyle={styles.buttonWhite}
                            titleStyle={styles.buttonWhiteTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Tourliste"
                            onPress={toggleTourListe}
                        />
                        <Button
                            buttonStyle={styles.buttonWhite}
                            titleStyle={styles.buttonWhiteTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Navigation"
                            onPress={toggleNavigation}
                        />
                        <Button
                            buttonStyle={styles.buttonBlue}
                            titleStyle={styles.buttonBlueTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Paket übergeben"
                            onPress={togglePaketGeben}
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
                                }
                            }}
                        />
                    </View>
                    <TourListe />
                    <Navigation />
                    <PaketGeben navigation={navigation} />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    header: {
        flex: 2,
        paddingLeft: "10%",
        alignItems: "flex-start",
        backgroundColor: "#F2F2F2",
    },
    content: {
        flex: 10,
        justifyContent: "center",
        alignItems: "flex-start",
        // paddingTop: "7%",
        // marginBottom: "40%",
        borderRadius: 25,
        backgroundColor: "#FFF",
        // height: "100%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.05,
        shadowRadius: 1.0,
        elevation: 2,
    },
    buttonWhite: {
        backgroundColor: "#FFF",
        height: 48,
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
        fontSize: RFValue(22),
        fontWeight: "600",
    },
    buttonBlue: {
        backgroundColor: "#3FA9F5",
        height: 48,
        width: "100%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    buttonBlueTitle: {
        color: "#FFF",
        fontSize: RFValue(22),
        fontWeight: "600",
    },
    buttonGrey: {
        backgroundColor: "transparent",
        height: 48,
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
        fontSize: RFValue(22),
        fontWeight: "600",
    },
    buttonDisabled: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#ccc",
    },
    zielText: {
        color: "#666",
        fontSize: RFValue(20),
    },
});
