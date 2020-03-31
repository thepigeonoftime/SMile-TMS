import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Register } from "./Register";
import { RegisterFahrzeug } from "./RegisterFahrzeug";
import { RegisterPerson } from "./RegisterPerson";
import { Settings } from "./Settings";


function RegisterGebietPreis({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 30 }}>Gebiet & Preis</Text>
            <Button onPress={() => navigation.goBack()} title="Zurück" />
        </View>
    );
}

function RegisterArbeitszeiten({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 30 }}>Arbeitszeiten</Text>
            <Button onPress={() => navigation.goBack()} title="Zurück" />
        </View>
    );
}

const Tabs = createBottomTabNavigator<{}>();

export const RegisterTabs = () => {
    return (
        <View style={styles.tabContainer}>
            <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === "TourStarten") {
                            return <EvilIcons name={"location"} size={size} color={color} />;
                        } else if (route.name === "TourView") {
                            return <AntDesign name={"calendar"} size={size} color={color} />;
                        } else if (route.name === "Settings") {
                            return <EvilIcons name={"gear"} size={size} color={color} />;
                        }
                        return <AntDesign name={"home"} size={size} color={color} />;
                    }
                })}
                tabBarOptions={{
                    activeTintColor: "#41A9F5",
                    inactiveTintColor: "gray",
                    style: styles.tabBar,
                    labelStyle: styles.tabLabel
                }}>
                <Tabs.Screen options={{ title: "Tour Starten" }} name="TourStarten" component={Register} />
                <Tabs.Screen options={{ title: "Tourenlogbuch" }} name="TourView" component={Register} />
                <Tabs.Screen options={{ title: "Einstellungen" }} name="Settings" component={Settings} />
            </Tabs.Navigator>
        </View>
    );
};

const Stack = createStackNavigator();

export const RegisterStack = () => {
    return (
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="Register" component={RegisterTabs} options={{}} />
            <Stack.Screen name="RegisterPerson" component={RegisterPerson} />
            <Stack.Screen name="RegisterFahrzeug" component={RegisterFahrzeug} />
            <Stack.Screen name="RegisterGebietPreis" component={RegisterGebietPreis} />
            <Stack.Screen name="RegisterArbeitszeiten" component={RegisterArbeitszeiten} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        height: "100%",
        backgroundColor: "#FFF"
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
        }
    },
    tabLabel: {
        fontSize: 13
    }
});