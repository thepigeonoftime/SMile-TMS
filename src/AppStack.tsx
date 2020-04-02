import {EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import {Home} from "./Home";
import {RegisterContext} from "./RegisterProvider";
import {Route} from "./Route";
import {TestStack} from "./TestStack";
import {AppProps} from "./Types";

const Tabs = createBottomTabNavigator<AppProps>();

export const AppTabs: React.FC<{}> = ({}) => {
    const {registered, unregister} = useContext(RegisterContext);
    return (
        <View style={styles.tabContainer}>
            <Tabs.Navigator
                screenOptions={({route}) => ({
                    header: null,
                    headerMode: null,
                    tabBarIcon: ({focused, color, size}) => {
                        if (route.name === "TourStart") {
                            return <EvilIcons name={"location"} size={size} color={color} />;
                        } else if (route.name === "TourLogbuch") {
                            return (
                                <MaterialCommunityIcons
                                    name={"clipboard-check-outline"}
                                    size={size}
                                    color={color}
                                />
                            );
                        } else if (route.name === "Settings") {
                            return <EvilIcons name={"gear"} size={size} color={color} />;
                        }
                    }
                })}
                tabBarOptions={{
                    activeTintColor: "#41A9F5",
                    inactiveTintColor: "gray",
                    style: styles.tabBar,
                    labelStyle: styles.tabLabel
                }}
            >
                <Tabs.Screen
                    name="TourStart"
                    options={{tabBarVisible: true, title: "Tour anfordern"}}
                    component={Home}
                />
                <Tabs.Screen
                    name="TourLogbuch"
                    options={{tabBarVisible: true, title: "Tourenlogbuch"}}
                    component={Route}
                />
                <Tabs.Screen
                    options={{title: "Einstellungen"}}
                    name="Settings"
                    component={TestStack}
                />
            </Tabs.Navigator>
        </View>
    );
};

const Stack = createStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="Home" component={AppTabs} options={{}} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        height: "100%",
        backgroundColor: "transparent"
    },
    tabBar: {
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
            height: 2
        },
        position: "absolute"
    },
    tabLabel: {
        fontSize: 13
    }
});
