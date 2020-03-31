
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "./AuthProvider";
import { RegisterContext } from "./RegisterProvider";

export const Register = ({ navigation }) => {
    const { logout } = useContext(AuthContext);
    const { register } = useContext(RegisterContext);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.logout}>
                    <TouchableOpacity
                        onPress={() => {
                            logout();
                        }}>
                        <Text>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerWrap}>
                    <Text style={styles.header}>Profil</Text>
                    <Text style={styles.subheader}>anlegen und individuelle{"\n"}Touren erhalten</Text>
                </View>
            </View>
            <View>
                <View style={styles.contentWrap}>
                    <View style={styles.contentInner}>
                        <TouchableOpacity onPress={() => navigation.navigate("RegisterPerson")}>
                            <Text style={[styles.navLink, { marginTop: 20 }]}>Persönliche Informationen</Text>
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
            </View>
        </ScrollView >
    );
};

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    logout: {
        position: "absolute",
        top: 50,
        right: 30,
        zIndex: 10
    },
    headerContainer: {
        backgroundColor: "#F2F2F2",
        alignItems: "center",
        justifyContent: "center",
        height: "35%"
    },
    headerWrap: {
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
        top: "-7%",
        backgroundColor: "#FFF",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        paddingBottom: "50%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 2.84,
        elevation: 5
    },
    contentInner: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        paddingTop: "1%",
        marginBottom: "20%"
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
        marginTop: "-10%"
    },
});
