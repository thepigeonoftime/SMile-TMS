import {AntDesign} from "@expo/vector-icons";
import React, {useState, useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Header} from "../Header";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export const Maps = ({navigation}) => {
    const [showMap, setShowMap] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShowMap(true);
        }, 290);
    });
    const origin = {latitude: 52.5, longitude: 13.405};
    const destination = {latitude: 52.55, longitude: 13.405};
    const GOOGLE_MAPS_APIKEY = "AIzaSyDzgQenA9LdgC7sIXpng2GgV9lvasHUFOo ";

    return (
        <View style={{flex: 1}}>
            <Header
                text="Tourvorbereitung"
                color="#729628"
                containerStyle={{
                    flex: 2,
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
                <View style={styles.mapsContainer}>
                    {showMap && (
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
                                strokeWidth={3}
                                strokeColor="#669df6"
                                optimizeWaypoints={true}
                            />
                        </MapView>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 10,
        borderRadius: 25,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.05,
        shadowRadius: 1.0,
        elevation: 2,
        marginTop: -50,
    },
    closeButtonContainer: {
        alignItems: "flex-end",
        padding: 5,
        marginTop: -23,
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
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
