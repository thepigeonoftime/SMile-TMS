import React, {useContext} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {TourContext} from "../TourProvider";
import Modal from "react-native-modal";
import IconClose from "~/assets/svg/menu-icn_close.svg";

export const PaketGeben = ({navigation}) => {
    const {tour, currentStop, showPaketGeben, togglePaketGeben, reportDelivery} = useContext(
        TourContext
    );

    const onSubmit = () => {
        const timestamp = new Date().toJSON();
        reportDelivery(tour.packets[currentStop - 1].sscc, timestamp);
        navigation.navigate("Authentifizierung");
        togglePaketGeben();
    };
    return (
        <Modal isVisible={showPaketGeben} style={styles.modal} backdropOpacity={0.4}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.textWrap}>
                        <Text style={styles.headerText}>Paket übergeben an:</Text>
                        <Text style={styles.text}>
                            {tour.stops[currentStop].firstName} {tour.stops[currentStop].lastName}
                            {"; "}
                            {tour.stops[currentStop].streetName}{" "}
                            {tour.stops[currentStop].streetNumber}
                            {"; "}
                            {tour.stops[currentStop].zip + " " + tour.stops[currentStop].city}
                        </Text>
                    </View>
                    <View style={styles.buttonWrap}>
                        <Button
                            buttonStyle={styles.buttonBlue}
                            titleStyle={styles.buttonBlueTitle}
                            // disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Paket übergeben"
                            onPress={onSubmit}
                        />
                        <Button
                            buttonStyle={styles.buttonGrey}
                            titleStyle={styles.buttonGreyTitle}
                            // disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Abbrechen"
                            onPress={togglePaketGeben}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 0,
        // alignItems: "center",
        // justifyContent: "flex-end",
        margin: 0,
        width: "100%",
        height: "50%",
        top: "50%",
    },
    container: {
        flex: 1,
        alignItems: "flex-start",
        width: "100%",
        // top: 500,
        height: "50%",
        paddingTop: 30,
        // paddingHorizontal: "10%",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: "#696d7d",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 1.0,
        elevation: 2,
        margin: 0,
    },
    content: {
        flex: 1,
        paddingHorizontal: 40,
        width: "100%",
    },
    textWrap: {
        flex: 1,
        alignItems: "flex-start",
        width: "100%",
    },
    headerText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
        paddingBottom: 10,
    },
    text: {
        flex: 1,
        color: "#FFF",
        fontSize: 17,
    },
    buttonWrap: {
        flex: 1.2,
        justifyContent: "flex-start",
        // paddingTop: 20,
    },

    buttonBlue: {
        // flex: 1,
        backgroundColor: "#3FA9F5",
        height: 50,
        width: "100%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonBlueTitle: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "600",
    },
    buttonGrey: {
        // flex: 1,
        backgroundColor: "transparent",
        height: 50,
        width: "100%",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        top: "5%",
        marginBottom: 20,
        borderColor: "#d7d0c8",
        borderWidth: 2,
    },
    buttonGreyTitle: {
        color: "#d7d0c8",
        fontSize: 22,
        fontWeight: "600",
    },
});
