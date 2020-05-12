import {AntDesign} from "@expo/vector-icons";
import Constants from "expo-constants";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";

export const Maps = ({navigation}) => {
    const {tour} = useContext(TourContext);
    const [showMap, setShowMap] = useState(false);
    const [region, setRegion] = useState({
        latitude: 42.55,
        longitude: 23.405,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });
    const [origin, setOrigin] = useState("Französische Straße 12 10117 Berlin");
    const [waypoints, setWaypoints] = useState([]);
    const [destination, setDestination] = useState("Französische Straße 12 10117 Berlin");
    const {width, height} = Dimensions.get("window");
    // const ASPECT_RATIO = width / height;
    const DIRECTIONS_APIKEY = Constants.manifest.extra.credentials.directionsApiKey;
    const GEOCODING_APIKEY = Constants.manifest.extra.credentials.geocodingApiKey;
    Geocoder.init(GEOCODING_APIKEY, {language: "de"});

    const mapRef = useRef(null);

    const getWaypoints = (tourStops) => {
        return new Promise((resolve, reject) => {
            try {
                let result = [];
                tourStops.forEach((stop) => {
                    result.push(
                        stop.streetName + " " + stop.streetNumber + " " + stop.zip + " " + stop.city
                    );
                });
                resolve({
                    center: result[Math.floor(result.length / 2)],
                    start: result.shift(),
                    end: result.pop(),
                    stops: result,
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    const getGeocode = async (origin) => {
        try {
            const geocode = await Geocoder.from(origin);
            return {
                latitude: geocode.results[0].geometry.location.lat,
                longitude: geocode.results[0].geometry.location.lng,
            };
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getWaypoints(tour.stops).then(({center, start, end, stops}) => {
            setOrigin(start);
            setDestination(end);
            setWaypoints(stops);
            getGeocode(center)
                .then((coords) => {
                    setRegion({...coords, latitudeDelta: 0.1, longitudeDelta: 0.1});
                    setTimeout(() => {
                        setShowMap(true);
                    }, 300);
                })
                .catch((err) => console.log(err));
        });
    }, []);

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
                    {region && origin && destination && showMap && (
                        <MapView
                            ref={(ref) => {
                                mapRef.current = ref;
                            }}
                            // onMapReady={() => {
                            //     // mapRef.current.fitToSuppliedMarkers(waypoints);
                            // }}
                            style={[StyleSheet.absoluteFillObject, {borderRadius: 25}]}
                            provider={PROVIDER_GOOGLE}
                            region={region}
                            initialRegion={region}
                            minZoomLevel={10}
                        >
                            <MapViewDirections
                                language="de"
                                origin={origin}
                                destination={destination}
                                waypoints={waypoints}
                                apikey={DIRECTIONS_APIKEY}
                                strokeWidth={4}
                                strokeColor="#ff009c"
                                optimizeWaypoints={true}
                                onReady={(result) => {
                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: width / 20,
                                            bottom: height / 20,
                                            left: width / 20,
                                            top: height / 20,
                                        },
                                    });
                                }}
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
