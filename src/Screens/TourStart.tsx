import {Entypo, Ionicons} from "@expo/vector-icons";
import React, {useContext} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {TourContext} from "../TourProvider";
import PaketIcon from "../../assets/svg/icn-mini_collie-no.svg";
import StopsIcon from "../../assets/svg/menu-icn_tour_stops.svg";
import LaengeIcon from "../../assets/svg/icn-mini_tour-length.svg";

interface IRoute {
    tour: {
        tours: {
            stops: [string | number];
        };
    };
    loading: boolean;
    navigation: any;
    error: string;
}

export const TourStart: React.FC<IRoute> = ({navigation}) => {
    const {tour, setTour, removeTour, setError, error} = useContext(TourContext);

    return (
        <ScrollView>
            {!error && tour && (
                <View style={styles.container}>
                    <View style={{flex: 1}} />
                    <View style={{flex: 10}}>
                        <View>
                            <Text style={[styles.depotHeader]}>Zentraldepot:</Text>
                            <Text style={[styles.depotText]}>
                                {tour.tours[0].stops[0].streetName}
                            </Text>
                            <Text style={[styles.depotText]}>
                                Nummer: {tour.tours[0].stops[0].streetNumber}
                            </Text>
                            <Text style={[styles.depotText]}>
                                {tour.tours[0].stops[0].zip + " " + tour.tours[0].stops[0].city}
                            </Text>
                        </View>
                        <View style={styles.tourLinkWrap}>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
                                    <Text style={styles.tourLink}>Gesamte Tour anzeigen</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconWrap}>
                                <Ionicons name="ios-arrow-forward" size={25} color="#ccc" />
                            </View>
                        </View>
                        <View style={[styles.pLeft]}>
                            <View
                                style={[
                                    {
                                        flexDirection: "column",
                                        // marginTop: "10%",
                                        justifyContent: "flex-start",
                                    },
                                ]}
                            >
                                <View
                                    style={{
                                        marginLeft: -25,
                                        marginRight: 20,
                                        marginTop: 10,
                                    }}
                                >
                                    <Entypo
                                        size={15}
                                        name="dots-three-vertical"
                                        color="#ccc"
                                        style={{}}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        marginTop: "1%",
                                    }}
                                >
                                    <PaketIcon
                                        width={25}
                                        height={25}
                                        fill="#ccc"
                                        style={{marginLeft: -30, marginRight: 20}}
                                    />
                                    <Text style={[styles.mFont, styles.green]}>
                                        {Object.keys(tour.tours[0].packets).length} Pakete
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: -25,
                                        marginRight: 20,
                                        marginTop: 10,
                                    }}
                                >
                                    <Entypo
                                        size={15}
                                        name="dots-three-vertical"
                                        color="#ccc"
                                        style={{}}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        marginTop: "1%",
                                    }}
                                >
                                    <StopsIcon
                                        width={25}
                                        height={25}
                                        fill="#ccc"
                                        style={{marginLeft: -30, marginRight: 20}}
                                    />
                                    <Text style={[styles.mFont, styles.green]}>
                                        {Object.keys(tour.tours[0].stops).length} Stops
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginLeft: -25,
                                        marginRight: 20,
                                        marginTop: 10,
                                    }}
                                >
                                    <Entypo
                                        size={15}
                                        name="dots-three-vertical"
                                        color="#ccc"
                                        style={{}}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        marginTop: "1%",
                                    }}
                                >
                                    <LaengeIcon
                                        width={25}
                                        height={25}
                                        fill="#ccc"
                                        style={{marginLeft: -30, marginRight: 20}}
                                    />
                                    {/* Google Maps calc distance */}
                                    <Text style={[styles.mFont, styles.green]}>10 Kilometer </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tourLinkWrap}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("PaketeLaden")}
                                >
                                    <Text style={[styles.tourLink]}>
                                        Pakete laden und Tour starten
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconWrap}>
                                <Ionicons name="ios-arrow-forward" size={25} color="#ccc" />
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

type BottomTabProps = {
    Home: undefined;
    Route: undefined;
    Settings: undefined;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        paddingTop: "20%",
    },
    depotHeader: {
        color: "#666",
        fontSize: 24,
        fontWeight: "bold",
    },
    depotText: {
        color: "#666",
        fontSize: 24,
    },
    tourLinkWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        marginTop: 40,
    },
    tourLink: {
        color: "#41A9F5",
        fontSize: 20,
        fontWeight: "bold",
    },
    iconWrap: {
        right: 30,
    },
    green: {
        color: "#729628",
    },
    mFont: {
        fontSize: 20,
    },
    pLeft: {
        paddingLeft: 30,
    },
});
