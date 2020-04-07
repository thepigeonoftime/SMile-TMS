import {AntDesign, EvilIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import {Home} from "./Home";
import {RegisterContext} from "./RegisterProvider";
import {RegisterStack} from "./RegisterStack";
import {Tour} from "./Tour";
import {AppTabsProps} from "./Types";

const Tabs = createBottomTabNavigator<AppTabsProps>();

export const AppTabs: React.FC = (AppTabsTypes) => {
    const {registered} = useContext(RegisterContext);
    return (
        <View style={styles.tabContainer}>
            <Tabs.Navigator
                initialRouteName="Settings"
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        if (route.name === "TourStarten") {
                            return (
                                <EvilIcons name={"location"} size={size} color={color} />
                            );
                        } else if (route.name === "TourLogbuch") {
                            return (
                                <AntDesign name={"calendar"} size={size} color={color} />
                            );
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
                    options={{title: "Tour Starten"}}
                    name="TourStarten"
                    component={Home}
                    listeners={{
                        tabPress: (e) => {
                            if (!registered) {
                                e.preventDefault();
                            }
                        },
                    }}
                />
                <Tabs.Screen
                    options={{title: "Tourenlogbuch"}}
                    name="TourLogbuch"
                    component={Tour}
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
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        height: "100%",
        backgroundColor: "#FFF",
    },
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