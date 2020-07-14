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

export const Maps = ({navigation}) => {
    const {tour} = useContext(TourContext);
    const [showMap, setShowMap] = useState(false);
    const [region, setRegion] = useState({
        latitude: 42.55,
        longitude: 23.405,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });
    const [waypoints, setWaypoints] = useState([]);
    const [destination, setDestination] = useState(null);
    const [depot, setDepot] = useState(null);
    const [location, setLocation] = useState(null);
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
                return Geocoder.from(stop.street + " " + stop.zip + " " + stop.city)
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
            start: result[0],
            end: result[result.length - 1],
            stops: result,
        };
    };

    useEffect(() => {
        (async () => {
            let currentLocation;
            const {status} = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                // setErrorMsg("Permission to access location was denied");
            } else {
                const locationData = await Location.getCurrentPositionAsync({});
                currentLocation = {
                    latitude: locationData.coords.latitude,
                    longitude: locationData.coords.longitude,
                };
            }
            currentLocation && setLocation(currentLocation);

            getGeocodes([tour._pickpoint, ...tour.stops]).then(({start, end, stops}) => {
                const [, ...deliveryStops] = stops; // get stops without depot
                const regionBuffer = currentLocation ? currentLocation : start; // center map view on current location or fall back to depot
                setDepot(start);
                setDestination(end);
                setWaypoints(deliveryStops);
                setRegion({...regionBuffer, latitudeDelta: 0.1, longitudeDelta: 0.1});
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
                    {region && depot && destination && waypoints && showMap && (
                        <MapView
                            ref={(ref) => {
                                mapRef.current = ref;
                            }}
                            // onMapReady={() => {
                            //     mapRef.current.fitToSuppliedMarkers(waypoints);
                            // }}
                            style={[StyleSheet.absoluteFillObject, {borderRadius: 25}]}
                            provider={PROVIDER_GOOGLE}
                            region={region}
                            initialRegion={region}
                            minZoomLevel={10}
                        >
                            {location && (
                                <Marker
                                    pinColor={"#ff0099"}
                                    coordinate={location}
                                    title={"Aktueller Standort"}
                                    description="Sie befinden sich hier"
                                />
                            )}
                            <Marker
                                pinColor={"#074dff"}
                                coordinate={depot}
                                title={"Depot"}
                                description={
                                    tour._pickpoint.street +
                                    "\n" +
                                    tour._pickpoint.zip +
                                    " " +
                                    tour._pickpoint.city
                                }
                            />
                            {waypoints.map((coordinate, index) => (
                                <Marker
                                    key={`coordinate_${index}`}
                                    pinColor={(index === waypoints.length - 1 && "#17a403") || null}
                                    coordinate={coordinate}
                                    title={
                                        (index in tour.stops &&
                                            tour.stops[index].firstName +
                                                " " +
                                                tour.stops[index].lastName) ||
                                        ""
                                    }
                                    description={
                                        (index in tour.stops &&
                                            tour.stops[index].street +
                                                "\n" +
                                                tour.stops[index].zip +
                                                " " +
                                                tour.stops[index].city) ||
                                        ""
                                    }
                                />
                            ))}
                            {location && (
                                <MapViewDirections
                                    language="de"
                                    origin={location}
                                    destination={depot}
                                    apikey={DIRECTIONS_APIKEY}
                                    strokeWidth={4}
                                    strokeColor="#00aaff"
                                    optimizeWaypoints={true}
                                    onReady={(result) => {
                                        location &&
                                            mapRef.current.fitToCoordinates(result.coordinates, {
                                                edgePadding: {
                                                    right: width / 20,
                                                    bottom: height / 7,
                                                    left: width / 20,
                                                    top: height / 15,
                                                },
                                            });
                                    }}
                                />
                            )}

                            <MapViewDirections
                                language="de"
                                origin={depot}
                                destination={destination}
                                waypoints={waypoints}
                                apikey={DIRECTIONS_APIKEY}
                                strokeWidth={5}
                                strokeColor="#ff009c"
                                onReady={(result) => {
                                    !location &&
                                        mapRef.current.fitToCoordinates(result.coordinates, {
                                            edgePadding: {
                                                right: width / 20,
                                                bottom: height / 7,
                                                left: width / 20,
                                                top: height / 15,
                                            },
                                        });
                                }}
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
