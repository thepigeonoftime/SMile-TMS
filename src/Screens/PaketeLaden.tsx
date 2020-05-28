import {AntDesign} from "@expo/vector-icons";
import React, {useContext, useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";

export const PaketeLaden = ({navigation}) => {
    const {tour, reportPickup} = useContext(TourContext);
    let content = "smile QR Code test";

    useEffect(() => {
        tour.packets.map((packet) => {
            reportPickup(packet.sscc, new Date().toJSON());
        });
    }, []);

    return (
        <View style={{flex: 1}}>
            <Header
                text="Tourvorbereitung"
                color="#729628"
                containerStyle={{
                    flex: 0.25,
                    paddingLeft: "10%",
                    paddingTop: "10%",
                    alignItems: "flex-start",
                    paddingBottom: "4%",
                    backgroundColor: "#F2F2F2",
                }}
            />
            <View style={styles.container}>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.closeButton}
                    >
                        <AntDesign name={"close"} size={20} color="#f89e3b" />
                    </TouchableOpacity>
                </View>
                <View style={styles.qrContainer}>
                    <QRCode
                        // codeStyle="square"
                        value={content}
                        size={250}
                        // style={{backgroundColor: "#FFF"}}
                    />
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Ziel")}>
                        <Text style={{color: "#3FA9F5"}}>Nächstes Ziel</Text>
                    </TouchableOpacity>
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
        marginTop: -50,
        justifyContent: "center",
    },
    closeButtonContainer: {
        alignItems: "flex-end",
        padding: 5,
        marginTop: -20,
        marginRight: 20,
    },
    closeButton: {
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 30,
        borderColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    qrContainer: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // paddingTop: "5%",
    },
});
