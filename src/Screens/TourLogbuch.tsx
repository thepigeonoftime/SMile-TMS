import React, {useEffect, useState, useCallback} from "react";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {View, StyleSheet, Text, AsyncStorage, ScrollView, SafeAreaView} from "react-native";
import {Header} from "../Header";
import moment from "moment";
import "moment/locale/de";
import {TouchableOpacity} from "react-native-gesture-handler";
import {createStackNavigator} from "@react-navigation/stack";
import {Center} from "../Center";
import {ActivityIndicator} from "react-native-paper";
import PaketIcon from "~/assets/svg/icn-mini_collie-no.svg";
import StopsIcon from "~/assets/svg/menu-icn_tour_stops.svg";
import DistanceIcon from "~/assets/svg/icn_tour-length.svg";

interface TourLogProps {
    // prettier-ignore
    ({ navigation, clearTours, children }: {
        clearTours?: (event) => void;
        children: React.ReactNode;
        navigation?: any;
    });
}

const TourLogView: TourLogProps = ({navigation, clearTours, children}) => {
    return (
        <View style={styles.container}>
            <Header
                text="Tourenlogbuch"
                color="#729628"
                containerStyle={{
                    paddingLeft: "10%",
                    height: "16%",
                    alignItems: "flex-start",
                    backgroundColor: "#F2F2F2",
                }}
                textStyle={{
                    paddingTop: "10%",
                    // paddingBottom: "4%",
                }}
            />
            {clearTours && (
                <View style={{position: "absolute", top: 50, right: 40}}>
                    <TouchableOpacity onPress={clearTours}>
                        <Text>clear</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* show close button if navigation is passed from detail view */}
            <View style={styles.content}>
                {navigation && (
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.closeButton}
                        >
                            <AntDesign name={"close"} size={20} color="#f89e3b" />
                        </TouchableOpacity>
                    </View>
                )}
                <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scrollView}>
                    {children}
                </ScrollView>
            </View>
        </View>
    );
};

const TourLogSummary = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [tourLogs, setTourLogs] = useState([]);

    moment.locale("de");

    useEffect(() => {
        navigation.addListener("focus", () => {
            AsyncStorage.getItem("TourLogbuch")
                .then((logs) => {
                    logs && setTourLogs(JSON.parse(logs));
                    setLoading(false);
                })
                .catch((err) => console.log(err));
        });
    }, []);

    const clearTours = () => {
        AsyncStorage.removeItem("TourLogbuch");
        setTourLogs([]);
    };

    if (loading) {
        return (
            <Center>
                <ActivityIndicator size="small" color="#FFF" />
            </Center>
        );
    } else {
        return (
            <TourLogView clearTours={clearTours}>
                {tourLogs.map((tourItem, index) => {
                    return (
                        <View key={index} style={styles.tourItem}>
                            <TouchableOpacity
                                style={styles.titleLink}
                                onPress={() => {
                                    navigation.navigate("TourLogDetail", {tourItem});
                                }}
                            >
                                <Text style={styles.date}>
                                    {moment(tourItem.tourMetaData.tourStartTime).format("L")} |{" "}
                                    {moment(tourItem.tourMetaData.tourStartTime).format("LT")}
                                </Text>
                                <View style={styles.icon}>
                                    <Ionicons
                                        name="ios-arrow-forward"
                                        size={25}
                                        color="#ccc"
                                        style={{marginTop: 5}}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.summaryDetails}>
                                <PaketIcon
                                    width={15}
                                    height={15}
                                    fill="#ccc"
                                    style={{marginTop: 2, marginRight: 5}}
                                />
                                <Text style={styles.summaryDetailText}>
                                    {Object.keys(tourItem.packets).length} Pakete
                                </Text>
                                <StopsIcon
                                    width={15}
                                    height={15}
                                    fill="#ccc"
                                    style={{marginTop: 2, marginRight: 5}}
                                />
                                <Text style={styles.summaryDetailText}>
                                    {Object.keys(tourItem.stops).length - 1} Stops
                                </Text>
                                <DistanceIcon
                                    width={15}
                                    height={15}
                                    fill="#ccc"
                                    style={{marginTop: 2, marginRight: 5}}
                                />
                                <Text style={styles.summaryDetailText}>{tourItem.distance} km</Text>
                            </View>
                        </View>
                    );
                })}
            </TourLogView>
        );
    }
};

const TourLogDetail = ({route, navigation}) => {
    const {tourItem} = route.params;
    console.log(tourItem);

    return (
        <TourLogView navigation={navigation}>
            {/* loop through tour stops, discarding initial depot entry */}
            {tourItem.stops.slice(1).map((item, index) => {
                return (
                    <View style={styles.single} key={index}>
                        <Text style={styles.singleText}>
                            {item.firstName +
                                " " +
                                item.lastName +
                                "; " +
                                item.streetName +
                                " " +
                                item.streetNumber +
                                "; " +
                                item.zip +
                                " " +
                                item.city}
                        </Text>
                        <View style={styles.singleDetails}>
                            <PaketIcon
                                width={15}
                                height={15}
                                fill="#ccc"
                                style={{marginTop: 2, marginRight: 5}}
                            />
                            <Text style={styles.singleDetailText}>
                                {
                                    tourItem.packets.filter(
                                        (packet) => packet.receiverID === item.id
                                    ).length
                                }
                                {" Pakete"}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </TourLogView>
    );
};

const Stack = createStackNavigator();

export const TourLogbuch = () => {
    return (
        <Stack.Navigator mode="card" headerMode="none">
            <Stack.Screen name="TourLogSummary" component={TourLogSummary} options={{}} />
            <Stack.Screen name="TourLogDetail" component={TourLogDetail} options={{}} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        // alignItems: "center",
        width: "100%",
        height: "40%",
        paddingTop: "8%",
        paddingBottom: "29%",
        paddingRight: "2%",
        marginBottom: "-20%",
        borderRadius: 25,
        borderBottomWidth: 0,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 1.0,
        elevation: 2,
        margin: 0,
    },
    scrollView: {
        paddingHorizontal: "11%",
        marginBottom: "15%",
    },
    closeButtonContainer: {
        alignItems: "flex-end",
        // padding: 5,
        marginTop: -60,
        marginRight: 20,
    },
    closeButton: {
        borderWidth: 0,
        margin: 5,
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
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tourItem: {
        paddingBottom: 20,
    },
    titleLink: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 22,
        fontWeight: "700",
        color: "#696d7d",
        paddingBottom: 5,
    },
    summaryDetails: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    summaryDetailText: {
        color: "#729628",
        paddingRight: 17,
    },
    icon: {
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    single: {
        paddingTop: 8,
        paddingBottom: 10,
    },
    singleText: {
        fontSize: 19,
        color: "#696d7d",
        fontWeight: "500",
    },
    singleDetails: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    singleDetailText: {
        color: "#729628",
        paddingRight: 40,
    },
});
