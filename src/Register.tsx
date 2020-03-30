import {AntDesign, EvilIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {useContext} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import {SafeAreaView} from "react-native-safe-area-context";
import {AuthContext} from "./AuthProvider";
import {RegisterContext} from "./RegisterProvider";
import {Settings} from "./Settings";

export const RegisterView = ({navigation}) => {
    const {logout} = useContext(AuthContext);
    const {registered, register} = useContext(RegisterContext);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logout}>
                <TouchableOpacity
                    onPress={() => {
                        logout();
                    }}>
                    <Text>LOGOUT</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.header}>Profil</Text>
                    <Text style={styles.subheader}>anlegen und individuelle{"\n"}Touren erhalten</Text>
                </View>
            </View>
            <View style={styles.contentWrap}>
                <View style={styles.contentInner}>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterPerson")}>
                        <Text style={[styles.navLink, {marginTop: 20}]}>Persönliche Informationen</Text>
                    </TouchableOpacity>
                    <Text style={styles.statusText}>Unvollständig</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterFahrzeug")}>
                        <Text style={[styles.navLink]}>Fahrzeuginformationen</Text>
                    </TouchableOpacity>
                    <Text style={styles.statusText}>Unvollständig</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterGebietPreis")}>
                        <Text style={[styles.navLink]}>Gebiet & Preis</Text>
                    </TouchableOpacity>
                    <Text style={styles.statusText}>Unvollständig</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterArbeitszeiten")}>
                        <Text style={[styles.navLink]}>Arbeitszeiten</Text>
                    </TouchableOpacity>
                    <Text style={styles.statusText}>Unvollständig</Text>
                </View>
                <View>
                    <Button
                        title="Account erstellen"
                        onPress={() => {
                            register();
                        }}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonTitle}
                        containerStyle={styles.buttonContainer}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const Tabs = createBottomTabNavigator<{}>();

export const Register = () => {
    return (
        <View style={styles.tabContainer}>
            <Tabs.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
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
                <Tabs.Screen options={{title: "Tour Starten"}} name="TourStarten" component={RegisterView} />
                <Tabs.Screen options={{title: "Tourenlogbuch"}} name="TourView" component={RegisterView} />
                <Tabs.Screen options={{title: "Einstellungen"}} name="Settings" component={Settings} />
            </Tabs.Navigator>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 0,
        backgroundColor: "#F2F2F2",
        height: "100%"
    },
    logout: {
        position: "absolute",
        top: 50,
        right: 30,
        zIndex: 10
    },
    headerContainer: {
        backgroundColor: "#F2F2F2",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        top: "8%"
    },
    header: {
        fontSize: 40,
        color: "#729628",
        fontWeight: "900"
    },
    subheader: {
        fontSize: 24,
        color: "#729628"
    },
    contentWrap: {
        top: "13%",
        backgroundColor: "#FFF",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.84,

        elevation: 5
    },
    contentInner: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        paddingTop: "1%"
    },
    navLink: {
        color: "#65697A",
        fontSize: 23,
        fontWeight: "bold",
        padding: 10
    },
    statusText: {
        color: "#D4CCC3",
        marginLeft: 10,
        fontSize: 16
    },
    button: {
        borderRadius: 40,
        height: 52,
        width: "102%"
    },
    buttonTitle: {
        fontWeight: "bold",
        fontSize: 26
    },
    buttonContainer: {
        top: 50
    },
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
