import {AntDesign, EvilIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {useContext} from "react";
import {StatusBar, StyleSheet, View, Text, ImageBackground} from "react-native";
import {RegisterContext} from "./RegisterProvider";
import {RegisterStack} from "./RegisterStack";
import {Test} from "./Screens/Test";
import {AppTabsProps} from "./Types";
import {TourContext} from "./TourProvider";
import {TourStack} from "./TourStack";
import {Center} from "./Center";
import {ActivityIndicator} from "react-native-paper";
import {TourLogbuch} from "./Screens/TourLogbuch";

const Tabs = createBottomTabNavigator<AppTabsProps>();

export const AppTabs: React.FC = () => {
    const {tour, currentStop} = useContext(TourContext);
    const {loading, registered} = useContext(RegisterContext);

    // StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    StatusBar.setBarStyle("dark-content");

    if (loading) {
        return (
            <ImageBackground source={require("~/assets/splash.png")} style={{flex: 1}}>
                <Center>
                    <ActivityIndicator size="small" color="#FFF" />
                </Center>
            </ImageBackground>
        );
    }

    return (
        <Tabs.Navigator
            initialRouteName={registered ? "TourStarten" : "Settings"}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    if (route.name === "TourStarten") {
                        return <EvilIcons name={"location"} size={size} color={color} />;
                    } else if (route.name === "TourLogbuch") {
                        return <AntDesign name={"calendar"} size={size} color={color} />;
                    } else if (route.name === "Settings") {
                        return <EvilIcons name={"gear"} size={size} color={color} />;
                    }
                    return <AntDesign name={"home"} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: "#41A9F5",
                inactiveTintColor: "gray",
                style: styles.tabBar,
                labelStyle: styles.tabLabel,
            }}
        >
            <Tabs.Screen
                options={{title: tour && currentStop !== 0 ? "Aktive Tour" : "Tour Starten"}}
                name="TourStarten"
                component={TourStack}
                listeners={({navigation}) => ({
                    tabPress: (e) => {
                        if (!registered || (tour && navigation.isFocused())) {
                            e.preventDefault();
                        }
                    },
                })}
            />
            <Tabs.Screen
                options={{title: "Tourenlogbuch"}}
                name="TourLogbuch"
                component={TourLogbuch}
                listeners={{
                    tabPress: (e) => {
                        if (!registered) {
                            e.preventDefault();
                        }
                    },
                }}
            />
            <Tabs.Screen
                options={{title: "Einstellungen"}}
                name="Settings"
                component={RegisterStack}
            />
        </Tabs.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: "3%",
        left: "5%",
        width: "90%",
        height: 70,
        padding: 0,
        margin: 0,
        fontSize: 30,
        borderRadius: 30,
        borderTopColor: "transparent",
        backgroundColor: "#FFF",
        paddingTop: 15,
        paddingBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    tabLabel: {
        fontSize: 13,
    },
});
