import React, {useContext} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {Navigation} from "./Navigation";
import {TourListe} from "./TourListe";
import {PaketGeben} from "./PaketGeben";

export const Ziel = ({navigation}) => {
    const {tour, toggleTourListe, toggleNavigation, togglePaketGeben} = useContext(TourContext);
    return (
        <ScrollView>
            {tour && (
                <View>
                    <Header text="Nächstes Ziel" color="#729628" containerStyle={styles.header} />
                    <View style={styles.content}>
                        <View style={{flex: 1, paddingLeft: "10%", paddingTop: "10%"}}>
                            <View>
                                <Text style={[styles.zielText, {fontWeight: "bold"}]}>
                                    {tour.tours[0].stops[1].firstName}{" "}
                                    {tour.tours[0].stops[1].lastName}
                                </Text>
                                <Text style={[styles.zielText, {fontWeight: "bold"}]}>
                                    {tour.tours[0].stops[1].streetName}
                                </Text>
                                <Text style={[styles.zielText]}>
                                    Nummer: {tour.tours[0].stops[1].streetNumber}
                                </Text>
                                <Text style={[styles.zielText]}>
                                    {tour.tours[0].stops[1].zip + " " + tour.tours[0].stops[1].city}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 4,
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
                        </View>
                        <TourListe />
                        <Navigation />
                        <PaketGeben navigation={navigation} />
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingLeft: "10%",
        paddingTop: "13%",
        alignItems: "flex-start",
        paddingBottom: "1%",
        backgroundColor: "#F2F2F2",
    },
    content: {
        justifyContent: "center",
        alignItems: "flex-start",
        // paddingTop: "7%",
        marginBottom: "40%",
        borderRadius: 25,
        backgroundColor: "#FFF",
        height: "100%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.05,
        shadowRadius: 1.0,
        elevation: 2,
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
