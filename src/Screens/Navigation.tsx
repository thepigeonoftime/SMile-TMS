import React, {useContext, useState, useEffect} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {TourContext} from "../TourProvider";
import Modal from "react-native-modal";
import IconClose from "~/assets/svg/menu-icn_close.svg";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export const Navigation = (props) => {
    const {showNavigation, toggleNavigation} = useContext(TourContext);
    const [showMap, setShowMap] = useState(false);
    const origin = {latitude: 52.52, longitude: 13.405};
    const destination = {latitude: 52.52, longitude: 13.405};
    const GOOGLE_MAPS_APIKEY = "AIzaSyDzgQenA9LdgC7sIXpng2GgV9lvasHUFOo";
    return (
        <Modal
            isVisible={showNavigation}
            // deviceWidth={deviceWidth}
            style={styles.modal}
            backdropOpacity={0.05}
            useNativeDriver={true}
            onModalShow={() => {
                setShowMap(true);
            }}
        >
            <View style={styles.container}>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setShowMap(false);
                            toggleNavigation();
                        }}
                        style={styles.closeButton}
                    >
                        <IconClose height={20} width={20} fill="#f89e3b" />
                    </TouchableOpacity>
                </View>
                {showMap && (
                    <View style={styles.mapsContainer}>
                        <MapView
                            style={[StyleSheet.absoluteFillObject, {borderRadius: 25}]}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: 52.52,
                                longitude: 13.405,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.05,
                            }}
                            minZoomLevel={10}
                        >
                            <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={GOOGLE_MAPS_APIKEY}
                            />
                        </MapView>
                    </View>
                )}
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
        // paddingHorizontal: "10%",
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
        marginTop: -60,
        marginBottom: -25,
        marginRight: 20,
        zIndex: 10,
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
    mapsContainer: {
        flex: 1,
        // alignItems: "center",
    },
});
