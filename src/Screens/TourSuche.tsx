import Axios from "axios";
import React, {useContext, useState} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import {AuthContext} from "../AuthProvider";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";
import {TourContext} from "../TourProvider";

export const TourSuche = ({navigation}) => {
    const {unregister} = useContext(RegisterContext);
    const {logout} = useContext(AuthContext);
    const {tour, setTour, removeTour, setError} = useContext(TourContext);
    const [sucheDisabled, setSucheDisabled] = useState(false);

    const fetchTour = () => {
        Axios.get("https://unsafe.run/getTours")
            .then((response) => {
                setTour(response.data);
                setSucheDisabled(false);
                navigation.navigate("TourStart");
            })
            .catch((error) => {
                setError(error);
            });
    };

    const getTour = () => {
        setSucheDisabled(true);
        setTimeout(fetchTour, 1000);
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    top: 30,
                    zIndex: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        unregister();
                        navigation.navigate("Settings");
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
                <Header
                    text="Suche jetzt"
                    color="#FFF"
                    bgColor="transparent"
                    subText="nach einer vefügbaren Route!"
                />
            </View>
            <View style={styles.buttonWrap}>
                <Button
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.saveButtonTitle}
                    disabledStyle={styles.saveButtonDisabled}
                    disabled={sucheDisabled}
                    title="Suche starten"
                    onPress={getTour}
                />
                <Button
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.saveButtonTitle}
                    disabledStyle={styles.saveButtonDisabled}
                    disabledTitleStyle={styles.saveButtonTitleDisabled}
                    disabled={!sucheDisabled}
                    title="abbrechen"
                    onPress={() => {
                        setSucheDisabled(false);
                    }}
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
        justifyContent: "flex-start",
    },
    buttonWrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -40,
    },
    saveButton: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: 200,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    saveButtonTitle: {
        fontSize: 22,
        fontWeight: "800",
    },
    saveButtonDisabled: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#ccc",
    },
    saveButtonTitleDisabled: {
        color: "#ccc",
    },
});
