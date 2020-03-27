import {AntDesign, EvilIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {Home} from "./Home";
import {Settings} from "./Settings";

const getRoute = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRoute = async (url: string) => {
        const response = await fetch(url);
        response
            .json()
            .then(res => setData(res))
            .then(() => setLoading(false))
            .catch(err => setError(err));
    };

    useEffect(() => {
        fetchRoute(url);
    }, []);
    return {data, loading};
};

interface IRoute {
    data: JSON;
    loading: boolean;
}
interface IRouteChildren extends IRoute {
    tours?: json;
    stops?: json;
}

const RouteView: React.FC<IRoute> = props => {
    const data = props.data;
    const loading = props.loading;
    return (
        <View style={[styles.container]}>
            {!loading && (
                <View style={[{flexDirection: "column", justifyContent: "space-evenly"}]}>
                    <View style={[styles.pLeft, {paddingTop: "20%"}]}>
                        <Text style={[styles.grey, styles.bFont, styles.bold]}>Zentraldepot:</Text>
                        <Text style={[styles.grey, styles.bFont]}>{data.tours[0].stops[0].streetName}</Text>
                        <Text style={[styles.grey, styles.bFont]}>Nummer: {data.tours[0].stops[0].streetNumber}</Text>
                        <Text style={[styles.grey, styles.bFont]}>{data.tours[0].stops[0].zip + " " + data.tours[0].stops[0].city}</Text>
                    </View>
                    <View style={styles.pTop}>
                        <View style={[{flexDirection: "row", justifyContent: "space-between"}]}>
                            <View>
                                <Text style={[styles.pLeft, styles.blue, styles.bold, styles.bFont]}>Gesamte Tour anzeigen</Text>
                            </View>
                            <View>
                                <Text style={[styles.pLeft, styles.grey, styles.bFont, {textAlign: "right", paddingRight: "5%"}]}>></Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.pLeft]}>
                        <View style={[{flexDirection: "column", marginTop: "10%"}]}>
                            <Text style={[styles.mFont, styles.green]}>{Object.keys(data.tours[0].packets).length} Pakete</Text>
                            <Text style={[styles.mFont, styles.green, {marginTop: "5%"}]}>
                                {Object.keys(data.tours[0].stops).length} Stops
                            </Text>
                            {/* Google Maps calc distance */}
                            <Text style={[styles.mFont, styles.green, {marginTop: "5%"}]}>10 Kilometer </Text>
                        </View>
                    </View>
                    <View style={styles.pTop}>
                        <View style={[styles.pLeft, {flexDirection: "row", justifyContent: "space-between"}]}>
                            <View>
                                <Text style={[styles.blue, styles.bold, styles.bFont]}>Pakete laden und Tour starten</Text>
                            </View>
                            <View>
                                <Text style={[styles.grey, styles.bFont, {textAlign: "right", paddingRight: "5%"}]}>></Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.pTop}></View>
                </View>
            )}
        </View>
    );
};

type BottomTabProps = {
    Home: undefined;
    Route: undefined;
    Settings: undefined;
};

const routeLogic = ({}) => {
    const {data, loading} = getRoute("https://bpt-lab.org/smile/sphinx/getTours");
    if (!loading) {
        return (
            //  <Text> {JSON.stringify(data, null, 2)} </Text>
            <RouteView data={data} loading={loading}></RouteView>
        );
    } else {
        return <ActivityIndicator />;
    }
};

const Tabs = createBottomTabNavigator<BottomTabProps>();

export const Route = ({}) => {
    return (
        //  <Text> {JSON.stringify(data, null, 2)} </Text>
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    if (route.name === "Home") {
                        return <AntDesign name={"home"} size={size} color={color} />;
                    } else if (route.name === "Route") {
                        return <EvilIcons name={"search"} size={size} color={color} />;
                    } else if (route.name === "Settings") {
                        return <EvilIcons name={"gear"} size={size} color={color} />;
                    }
                    // default fallback
                    return <AntDesign name={"home"} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: "#41A9F5",
                inactiveTintColor: "gray",
                style: {
                    position: "relative",
                    bottom: "15%",
                    left: "2,5%",
                    width: "95%",
                    height: 70,
                    borderRadius: 30,
                    paddingTop: 10,
                    paddingBottom: 15,
                    borderTopColor: "transparent",
                    backgroundColor: "#FFF"
                }
            }}>
            <Tabs.Screen options={{title: "Aktive Tour"}} name="Route" component={routeLogic} />
            <Tabs.Screen options={{title: "Tourenübersicht"}} name="Home" component={Home} />
            <Tabs.Screen options={{title: "Einstellungen"}} name="Settings" component={Settings} />
        </Tabs.Navigator>
    );
    // const stops = Object.keys(data.tours[0].stops);
    // const packets = Object.keys(data.tours[0].packets);
};

const styles = StyleSheet.create({
    container: {},
    bold: {
        fontWeight: "bold"
    },
    grey: {
        color: "#666"
    },
    blue: {
        color: "#41A9F5"
    },
    green: {
        color: "#729628"
    },
    bFont: {
        fontSize: 24
    },
    mFont: {
        fontSize: 20
    },
    sFont: {
        fontSize: 18
    },
    pLeft: {
        paddingLeft: 40
    },
    pTop: {
        paddingTop: 50
    }
});
