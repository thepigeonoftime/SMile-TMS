import {AntDesign} from "@expo/vector-icons";
import Constants from "expo-constants";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View, Platform} from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";
import {TourContext} from "../TourProvider";

export const Navigation = (props) => {
    const {tour, currentStop, showNavigation, toggleNavigation} = useContext(TourContext);
    const [showMap, setShowMap] = useState(false);
    const [region, setRegion] = useState({
        latitude: 42.55,
        longitude: 23.405,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });
    const [origin, setOrigin] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [destination, setDestination] = useState(null);
    const {width, height} = Dimensions.get("window");
    // const ASPECT_RATIO = width / height;
    const DIRECTIONS_APIKEY = Constants.manifest.extra.credentials.directionsApiKey;
    const GEOCODING_APIKEY = Constants.manifest.extra.credentials.geocodingApiKey;
    // @ts-ignore
    Geocoder.init(GEOCODING_APIKEY, {language: "de"});

    const mapRef = useRef(null);

    const getGeocodes = async (tourStops) => {
        const result: any[] = await Promise.all(
            tourStops.map((stop) => {
                if (stop) {
                    // @ts-ignore
                    return Geocoder.from(
                        stop.streetName + " " + stop.streetNumber + " " + stop.zip + " " + stop.city
                    )
                        .then((json) => {
                            return {
                                latitude: json.results[0].geometry.location.lat,
                                longitude: json.results[0].geometry.location.lng,
                            };
                        })
                        .catch((err) => {
                            return err;
                        });
                }
            })
        );
        return {
            // center: result[Math.floor(result.length / 2)],
            start: result[0],
            end: result[1],
            stops: result,
        };
    };

    useEffect(() => {
        if (showNavigation) {
            const nextStops = [tour.stops[currentStop - 1], tour.stops[currentStop]];
            getGeocodes(nextStops).then(({start, end, stops}) => {
                setOrigin(start);
                setDestination(end);
                setWaypoints(stops);
                setRegion({...start, latitudeDelta: 0.1, longitudeDelta: 0.1});
                setTimeout(() => {
                    setShowMap(true);
                }, 500);
                // mapRef.current.animateCamera({
                //     center: start,
                //     pitch: 1000,
                //     zoom: 15,
                // });
            });
        }
    }, [showNavigation]);

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
                        <AntDesign name={"close"} size={20} color="#f89e3b" />
                    </TouchableOpacity>
                </View>
                <View style={styles.mapsContainer}>
                    {region && origin && destination && showMap && (
                        <MapView
                            ref={(ref) => {
                                mapRef.current = ref;
                            }}
                            onMapReady={() => {
                                // mapRef.current.setCamera({
                                //     center: origin,
                                //     pitch: 1000,
                                //     zoom: 15,
                                //     tilt: 100,
                                // });
                            }}
                            style={[StyleSheet.absoluteFillObject, {borderRadius: 25}]}
                            provider={PROVIDER_GOOGLE}
                            region={region}
                            initialRegion={region}
                            showsTraffic={true}
                            // minZoomLevel={10}
                        >
                            {waypoints.map((coordinate, index) => (
                                <Marker
                                    key={`coordinate_${index}`}
                                    pinColor={
                                        (index === 0 && "#074dff") ||
                                        (index === waypoints.length - 1 && "#17a403") ||
                                        null
                                    }
                                    coordinate={coordinate}
                                />
                            ))}
                            <MapViewDirections
                                language="de"
                                origin={origin}
                                destination={destination}
                                apikey={DIRECTIONS_APIKEY}
                                strokeWidth={4}
                                strokeColor="#ff009c"
                                optimizeWaypoints={true}
                                onReady={(result) => {
                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            // right: width / 20,
                                            // bottom: height / 2,
                                            // left: width / 20,
                                            // top: height / 7,
                                            right: 50,
                                            bottom: Platform.OS === "ios" ? 100 : 200,
                                            left: 50,
                                            top: Platform.OS === "ios" ? 50 : 100,
                                        },
                                    });
                                }}
                            />
                        </MapView>
                    )}
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
        width: "100%",
        // alignItems: "center",
    },
});
