import {AntDesign, EvilIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {useContext} from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {RegisterContext} from "./RegisterProvider";
import {RegisterStack} from "./RegisterStack";
import {Test} from "./Screens/Test";
import {AppTabsProps} from "./Types";
import {TourContext} from "./TourProvider";
import {TourStack} from "./TourStack";

const Tabs = createBottomTabNavigator<AppTabsProps>();

export const AppTabs: React.FC = () => {
    const {tour} = useContext(TourContext);
    const {registered} = useContext(RegisterContext);

    // StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    StatusBar.setBarStyle("dark-content");

    return (
        <View style={styles.tabContainer}>
            <View
                style={{
                    height: 20,
                    width: "100%",
                    backgroundColor: "#F2F2F2",
                    zIndex: 3,
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />
            <Tabs.Navigator
                initialRouteName="Settings"
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
                    options={{title: "Tour Starten"}}
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
                    component={Test}
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
