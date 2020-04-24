import React, {useContext} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {TourContext} from "../TourProvider";
import Modal from "react-native-modal";
import IconClose from "~/assets/svg/menu-icn_close.svg";

export const Navigation = (props) => {
    const {showNavigation, toggleNavigation} = useContext(TourContext);
    return (
        <Modal
            isVisible={showNavigation}
            // deviceWidth={deviceWidth}
            style={styles.modal}
            backdropOpacity={0.05}
        >
            <View style={styles.container}>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity onPress={toggleNavigation} style={styles.closeButton}>
                        <IconClose height={20} width={20} fill="#f89e3b" />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text>Navigation</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        left: -20,
        width: "100%",
    },
    container: {
        flex: 1,
        // alignItems: "center",
        width: "100%",
        top: 110,
        // height: "50%",
        paddingTop: "10%",
        paddingHorizontal: "10%",
        borderRadius: 25,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 1.0,
        elevation: 2,
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
        alignItems: "center",
    },
});
