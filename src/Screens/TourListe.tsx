import React, {useContext} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from "react-native";
import {Button} from "react-native-elements";
import {TourContext} from "../TourProvider";
import Modal from "react-native-modal";
import IconClose from "~/assets/svg/menu-icn_close.svg";
import {ZielProps} from "../Types";

export const TourListe = (props) => {
    const {tour, currentStop, showTourListe, toggleTourListe} = useContext(TourContext);
    return (
        <Modal isVisible={showTourListe} style={styles.modal} backdropOpacity={0.05}>
            <View style={styles.container}>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity onPress={toggleTourListe} style={styles.closeButton}>
                        <IconClose height={20} width={20} fill="#f89e3b" />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={{flex: 1}}>
                            <Text style={styles.headerText}>Tourliste</Text>
                            <View style={styles.zielListe}>
                                {tour.stops.map((stop: ZielProps, index: number) => {
                                    return (
                                        <View key={stop._id} style={styles.ziel}>
                                            <Text
                                                style={[
                                                    styles.zielText,
                                                    index === currentStop && {
                                                        fontWeight: "bold",
                                                    },
                                                ]}
                                            >
                                                {stop.firstName +
                                                    " " +
                                                    stop.lastName +
                                                    "; " +
                                                    stop.street +
                                                    "; " +
                                                    stop.zip +
                                                    " " +
                                                    stop.city}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        width: "100%",
    },
    container: {
        flex: 1,
        // alignItems: "center",
        width: "100%",
        top: 120,
        height: "50%",
        paddingTop: "10%",
        paddingHorizontal: "10%",
        borderRadius: 25,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 1.0,
        elevation: 2,
        margin: 0,
    },
    closeButtonContainer: {
        // flex: 1,
        alignItems: "flex-end",
        padding: 5,
        marginTop: -55,
        marginRight: 0,
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
    content: {
        flex: 1,
        // alignItems: "center",
    },
    headerText: {
        fontSize: 19,
        color: "#6a6e7e",
        fontWeight: "bold",
    },
    zielListe: {
        paddingTop: "10%",
    },
    ziel: {
        flex: 1,
        paddingVertical: 10,
    },
    zielText: {
        color: "#666",
        fontSize: 20,
    },
});
