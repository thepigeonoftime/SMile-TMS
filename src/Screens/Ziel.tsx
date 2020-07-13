import React, {useContext, useState, useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {Navigation} from "./Navigation";
import {PaketGeben} from "./PaketGeben";
import {TourListe} from "./TourListe";
import {TourSuche} from "./TourSuche";
import {RFValue, RFPercentage} from "react-native-responsive-fontsize";
import PaketIcon from "~/assets/svg/icn-mini_collie-no.svg";

export const Ziel = ({navigation}) => {
    const {
        tour,
        currentStop,
        nextStop,
        finishTour,
        toggleTourListe,
        toggleNavigation,
        togglePaketGeben,
    } = useContext(TourContext);

    const [packetCount, setPacketCount] = useState(0);
    const [packetLabel, setPacketLabel] = useState("Paket");
    const [updatePacketCount, setUpdatePacketCount] = useState(0);

    useEffect(() => {
        const numPackets = tour.packets.filter(
            (packet) => packet._receiverId === tour.stops[currentStop]._receiverId
        ).length;
        numPackets > 1 && setPacketLabel("Pakete");
        setPacketCount(numPackets);
    }, [updatePacketCount]);

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
                    <View style={styles.zielWrap}>
                        <View style={styles.ziel}>
                            <Text style={[styles.zielText, {fontWeight: "bold"}]}>
                                {tour.stops[currentStop].firstName}{" "}
                                {tour.stops[currentStop].lastName}
                            </Text>
                            <Text style={[styles.zielText]}>{tour.stops[currentStop].street}</Text>
                            <Text style={[styles.zielText]}>
                                {tour.stops[currentStop].zip + " " + tour.stops[currentStop].city}
                            </Text>
                        </View>
                        <View style={styles.packetInfo}>
                            <Text style={styles.packetText}>{packetCount}</Text>
                            <PaketIcon
                                width={20}
                                height={20}
                                fill="#ccc"
                                style={{marginTop: 1, marginHorizontal: 5}}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonWrap}>
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
                            title={packetLabel + " übergeben"}
                            onPress={togglePaketGeben}
                        />
                        <Button
                            buttonStyle={styles.buttonGrey}
                            titleStyle={styles.buttonGreyTitle}
                            disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title={packetLabel + " nicht zustellbar"}
                            onPress={() => {
                                if (currentStop < tour.stops.length - 1) {
                                    nextStop();
                                    setUpdatePacketCount(updatePacketCount + 1);
                                    // navigation.navigate("Ziel");
                                } else {
                                    finishTour(navigation);
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
        alignItems: "stretch",
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
    zielWrap: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    ziel: {
        flex: 1,
        paddingLeft: "10%",
        paddingTop: "7%",
    },
    zielText: {
        color: "#666",
        fontSize: 21,
    },
    packetInfo: {
        flexDirection: "row",
        paddingRight: "10%",
        paddingTop: "7%",
    },
    packetText: {
        color: "#888",
        fontSize: 20,
    },
    buttonWrap: {
        flex: 2.8,
        justifyContent: "flex-start",
        alignSelf: "center",
        width: "80%",
        marginTop: "5%",
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
        fontSize: 22,
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
        fontSize: 22,
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
        fontSize: 22,
        fontWeight: "600",
    },
    buttonDisabled: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#ccc",
    },
});
