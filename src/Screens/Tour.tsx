import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import {Center} from "../Center";
import {createStackNavigator} from "@react-navigation/stack";
import {Maps} from "./Maps";

const getTour = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRoute = async (url: string) => {
        const response = await fetch(url);
        response
            .json()
            .then((res) => setData(res))
            .then(() => setLoading(false))
            .catch((err) => setError(err));
    };

    useEffect(() => {
        fetchRoute(url);
    }, []);
    return {data, loading};
};

interface IRoute {
    data: {
        tours: {
            stops: [string | number];
        };
    };
    loading: boolean;
    navigation: any;
}

const Stack = createStackNavigator();

export const TourView: React.FC<IRoute> = (props, {navigation}) => {
    const data = props.data;
    const loading = props.loading;
    return (
        <ScrollView>
            {!loading && (
                <View style={styles.container}>
                    <View style={{flex: 1}} />
                    <View style={{flex: 10}}>
                        <View>
                            <Text style={[styles.depotHeader]}>Zentraldepot:</Text>
                            <Text style={[styles.depotText]}>
                                {data.tours[0].stops[0].streetName}
                            </Text>
                            <Text style={[styles.depotText]}>
                                Nummer: {data.tours[0].stops[0].streetNumber}
                            </Text>
                            <Text style={[styles.depotText]}>
                                {data.tours[0].stops[0].zip + " " + data.tours[0].stops[0].city}
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
                                    {Object.keys(data.tours[0].packets).length} Pakete
                                </Text>
                                <Text style={[styles.mFont, styles.green, {marginTop: "5%"}]}>
                                    {Object.keys(data.tours[0].stops).length} Stops
                                </Text>
                                {/* Google Maps calc distance */}
                                <Text style={[styles.mFont, styles.green, {marginTop: "5%"}]}>
                                    10 Kilometer{" "}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tourLinkWrap}>
                            <View>
                                <Text style={[styles.tourLink]}>Pakete laden und Tour starten</Text>
                            </View>
                            <View style={styles.iconWrap}>
                                <Ionicons name="ios-arrow-forward" size={25} color={"#555"} />
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {loading && (
                <View>
                    <Center>
                        <Text>loading..</Text>
                    </Center>
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

export const Tour = ({navigation}) => {
    // const { data, loading } = getRoute("https://bpt-lab.org/smile/sphinx/getTours");
    const {data, loading} = getTour("http://localhost:3001/tours");
    const TourWrap = () => {
        return <TourView data={data} loading={loading} navigation={navigation} />;
    };

    if (!loading) {
        return (
            <Stack.Navigator mode="modal" headerMode="none">
                <Stack.Screen name="Tour" component={TourWrap} options={{}} />
                <Stack.Screen name="Maps" component={Maps} options={{}} />
            </Stack.Navigator>
        );
    } else {
        return <ActivityIndicator />;
    }
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
