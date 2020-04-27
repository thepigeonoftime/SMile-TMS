import React, {useContext} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import Modal from "react-native-modal";
import {RegisterContext} from "../RegisterProvider";

export const RegisterModal = ({navigation}) => {
    const {register, showRegModal, toggleRegModal} = useContext(RegisterContext);
    return (
        <Modal isVisible={showRegModal} style={styles.modal} backdropOpacity={0.4}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.textWrap}>
                        <Text style={styles.text}>
                            Möchten Sie einen Account mit den von Ihnen hinterlegten Daten
                            erstellen?
                        </Text>
                    </View>
                    <View style={styles.buttonWrap}>
                        <Button
                            buttonStyle={styles.buttonBlue}
                            titleStyle={styles.buttonBlueTitle}
                            // disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Account erstellen"
                            onPress={() => {
                                register();
                                toggleRegModal();
                                navigation.navigate("TourStarten");
                            }}
                        />
                        <Button
                            buttonStyle={styles.buttonGrey}
                            titleStyle={styles.buttonGreyTitle}
                            // disabledStyle={styles.buttonDisabled}
                            disabled={false}
                            title="Abbrechen"
                            onPress={toggleRegModal}
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
    text: {
        flex: 1,
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
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
