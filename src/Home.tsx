import {createStackNavigator} from "@react-navigation/stack";
import React, {useContext} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import {AuthContext} from "./AuthProvider";
import {Header} from "./Header";
import {RegisterContext} from "./RegisterProvider";
import {HomeProps} from "./Types";

const Stack = createStackNavigator<HomeProps>();

export const Home = () => {
    const {unregister} = useContext(RegisterContext);
    const {logout} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View
                style={{
                    // position: "absolute",
                    top: 30,
                    zIndex: 10,
                    flexDirection: "row",
                    // flex: 1
                    justifyContent: "space-between",
                    padding: 10
                    // alignItems: "stretch"
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        unregister();
                    }}
                >
                    <Text>unregister</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        logout();
                    }}
                >
                    <Text>logout</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Header text="Suche jetzt" color="#FFF" subText="nach einer vefügbaren Route!" />
            </View>
            <View style={{justifyContent: "center", alignItems: "center", top: "10%"}}>
                <Button
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.saveButtonTitle}
                    disabledStyle={styles.saveButtonDisabled}
                    disabled={false}
                    title="Suche starten"
                    onPress={() => {}}
                />
                <Button
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.saveButtonTitle}
                    disabledStyle={styles.saveButtonDisabled}
                    disabledTitleStyle={styles.saveButtonTitleDisabled}
                    disabled={true}
                    title="abbrechen"
                    onPress={() => {}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#729628",
        flex: 1,
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-start"
    },
    saveButton: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: 200,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    saveButtonTitle: {
        fontSize: 22,
        fontWeight: "800"
    },
    saveButtonDisabled: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#ccc"
    },
    saveButtonTitleDisabled: {
        color: "#ccc"
    }
});
