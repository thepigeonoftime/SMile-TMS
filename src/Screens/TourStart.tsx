import {Ionicons} from "@expo/vector-icons";
import React, {useContext} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {TourContext} from "../TourProvider";

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

export const TourStart: React.FC<IRoute> = (props, {navigation}) => {
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
                                <TouchableOpacity onPress={() => props.navigation.navigate("Maps")}>
                                    <Text style={styles.tourLink}>Gesamte Tour anzeigen</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconWrap}>
                                <Ionicons name="ios-arrow-forward" size={25} color={"#555"} />
                            </View>
                        </View>
                        <View style={[styles.pLeft]}>
                            <View style={[{flexDirection: "column", marginTop: "10%"}]}>
                                <Text style={[styles.mFont, styles.green]}>
                                    {Object.keys(tour.tours[0].packets).length} Pakete
                                </Text>
                                <Text style={[styles.mFont, styles.green, {marginTop: "5%"}]}>
                                    {Object.keys(tour.tours[0].stops).length} Stops
                                </Text>
                                {/* Google Maps calc distance */}
                                <Text style={[styles.mFont, styles.green, {marginTop: "5%"}]}>
                                    10 Kilometer{" "}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tourLinkWrap}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate("PaketeLaden")}
                                >
                                    <Text style={[styles.tourLink]}>
                                        Pakete laden und Tour starten
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.iconWrap}>
                                <Ionicons name="ios-arrow-forward" size={25} color={"#555"} />
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
        marginTop: 50,
    },
    tourLink: {
        color: "#41A9F5",
        fontSize: 22,
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
