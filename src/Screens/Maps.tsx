import {AntDesign} from "@expo/vector-icons";
import Constants from "expo-constants";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import * as Location from "expo-location";
import {lockAsync} from "expo/build/ScreenOrientation/ScreenOrientation";

export const Maps = ({navigation}) => {
    const {tour} = useContext(TourContext);
    const [showMap, setShowMap] = useState(false);
    const [region, setRegion] = useState({
        latitude: 42.55,
        longitude: 23.405,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });
    const [origin, setOrigin] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [deliveryStops, setDeliveryStops] = useState([]);
    const [destination, setDestination] = useState(null);
    const [depot, setDepot] = useState(null);
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
            })
        );
        return {
            center: result[Math.floor(result.length / 2)],
            depot: result[0],
            end: result[result.length - 1],
            stops: result,
        };
    };

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                // setErrorMsg("Permission to access location was denied");
            }

            let locationData = await Location.getCurrentPositionAsync({});
            const location = {
                latitude: locationData.coords.latitude,
                longitude: locationData.coords.longitude,
            };
            getGeocodes(tour.stops).then(({center, depot, end, stops}) => {
                // get stops without depot for deliveryStops
                const [, ...deliveryPoints] = stops;
                // add current location to waypoints/markers
                stops.unshift(location);
                setDeliveryStops(deliveryPoints);
                setOrigin(location);
                setDepot(depot);
                setDestination(end);
                setWaypoints(stops);
                setRegion({...location, latitudeDelta: 0.1, longitudeDelta: 0.1});
                setTimeout(() => {
                    setShowMap(true);
                }, 300);
            });
        })();
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
                            {waypoints.map((coordinate, index) => (
                                <Marker
                                    key={`coordinate_${index}`}
                                    pinColor={
                                        (index === 0 && "#ff009c") ||
                                        (index === 1 && "#074dff") ||
                                        (index === waypoints.length - 1 && "#17a403") ||
                                        null
                                    }
                                    coordinate={coordinate}
                                    // title={"depot"}
                                    // description={"depot"}
                                />
                            ))}
                            <MapViewDirections
                                language="de"
                                origin={origin}
                                destination={depot}
                                apikey={DIRECTIONS_APIKEY}
                                strokeWidth={4}
                                strokeColor="#00aaff"
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

                            <MapViewDirections
                                language="de"
                                origin={depot}
                                destination={destination}
                                waypoints={deliveryStops}
                                apikey={DIRECTIONS_APIKEY}
                                strokeWidth={5}
                                strokeColor="#ff009c"
                                // optimizeWaypoints={true}
                                // onReady={(result) => {
                                //     mapRef.current.fitToCoordinates(result.coordinates, {
                                //         edgePadding: {
                                //             right: width / 20,
                                //             bottom: height / 20,
                                //             left: width / 20,
                                //             top: height / 20,
                                //         },
                                //     });
                                // }}
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
