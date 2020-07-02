import Axios from "axios";
import React, {useContext, useState} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Animated, ImageBackground} from "react-native";
import {Button} from "react-native-elements";
import {AuthContext} from "../AuthProvider";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";
import {TourContext} from "../TourProvider";
import {useAnimation} from "react-native-animation-hooks";
import IconClose from "~/assets/svg/menu-icn_close.svg";
import {fetchTour} from "../Requests";

export const TourSuche = ({navigation}) => {
    const {unregister} = useContext(RegisterContext);
    const {logout} = useContext(AuthContext);
    const {tour, setTour, removeTour, setError} = useContext(TourContext);
    const [sucheDisabled, setSucheDisabled] = useState(false);
    const [showError, setShowError] = useState(false);
    const [timeoutID, setTimeoutID] = useState<ReturnType<typeof setTimeout>>(null);

    const getTour = () => {
        fetchTour()
            .then((response) => {
                setTour(response.data);
                setSucheDisabled(false);
                navigation.navigate("TourStart");
            })
            .catch((error) => {
                setShowError(true);
                setSucheDisabled(false);
                setError(error);
            });
    };

    const cancelSearch = () => {
        clearTimeout(timeoutID);
        setSucheDisabled(false);
        setShowError(false);
    };

    const searchTour = () => {
        const searchTimeout = setTimeout(getTour, 1000);
        setTimeoutID(searchTimeout);
        setShowError(false);
        setSucheDisabled(true);
    };

    const aHeight = useAnimation({
        type: "timing",
        initialValue: 0,
        toValue: showError ? 100 : 0,
        duration: showError ? 300 : 200,
        useNativeDriver: false,
    });

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/splash.png")} style={{flex: 1}}>
                <TouchableOpacity onPress={() => setShowError(false)}>
                    <Animated.View
                        style={{
                            height: aHeight,
                            backgroundColor: "#fb9f54",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 20,
                            opacity: showError ? 1 : 0,
                        }}
                    >
                        <Text style={{color: "#fff", paddingTop: 10}}>
                            Probleme beim Laden der Tour. Bitte erneut versuchen.
                        </Text>
                        <IconClose width={15} height={15} fill="#FFF" />
                    </Animated.View>
                </TouchableOpacity>
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
                <Header
                    text="Suche jetzt"
                    color="#FFF"
                    bgColor="transparent"
                    subText="nach einer vefügbaren Route!"
                    containerStyle={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    textStyle={{
                        paddingTop: "7%",
                        fontSize: 45,
                    }}
                    subTextStyle={{
                        fontSize: 20,
                    }}
                />
                <View style={styles.buttonWrap}>
                    <Button
                        buttonStyle={styles.searchButton}
                        titleStyle={styles.searchButtonTitle}
                        disabledStyle={styles.searchButtonDisabled}
                        disabled={sucheDisabled}
                        title="Suche starten"
                        onPress={searchTour}
                    />
                    <Button
                        buttonStyle={styles.searchButton}
                        titleStyle={styles.searchButtonTitle}
                        disabledStyle={styles.searchButtonDisabled}
                        disabledTitleStyle={styles.searchButtonTitleDisabled}
                        disabled={!sucheDisabled}
                        title="abbrechen"
                        onPress={cancelSearch}
                    />
                </View>
            </ImageBackground>
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
        flex: 1.8,
        justifyContent: "flex-start",
        alignItems: "center",
        // marginTop: -40,
    },
    searchButton: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: 200,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    searchButtonTitle: {
        fontSize: 23,
        fontWeight: "800",
    },
    searchButtonDisabled: {
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: "#ccc",
    },
    searchButtonTitleDisabled: {
        color: "#ccc",
    },
});
