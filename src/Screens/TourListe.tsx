import React, {useContext} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";

export const TourListe = ({navigation}) => {
    const {tour} = useContext(TourContext);
    let content = "smile QR Code test";
    return (
        <ScrollView>
            {tour && (
                <View style={{}}>
                    <Header
                        text="Nächstes Ziel"
                        color="#729628"
                        containerStyle={{
                            paddingLeft: "10%",
                            paddingTop: "13%",
                            alignItems: "flex-start",
                            paddingBottom: "1%",
                            backgroundColor: "#F2F2F2",
                        }}
                    />
                    <View style={styles.content}>
                        <View style={{flex: 1, paddingLeft: "10%", paddingTop: "10%"}}>
                            <View>
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
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: {
        justifyContent: "flex-start",
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
    zielText: {
        color: "#666",
        fontSize: 20,
    },
});
