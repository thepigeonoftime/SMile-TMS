import React, {useContext} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import {AuthContext} from "../AuthProvider";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";

export const Register = ({navigation}) => {
    const {logout} = useContext(AuthContext);
    const {register, registered} = useContext(RegisterContext);

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.logout}>
                    <TouchableOpacity
                        onPress={() => {
                            logout();
                        }}
                    >
                        <Text>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
                <Header
                    text="Profil"
                    subText={"anlegen und individuelle\nTouren erhalten"}
                    containerStyle={{
                        paddingLeft: 60,
                        paddingTop: "15%",
                        alignItems: "flex-start",
                        paddingBottom: 60,
                        backgroundColor: "#F2F2F2",
                    }}
                />
            </View>
            <View>
                <View style={styles.contentWrap}>
                    <View style={styles.contentInner}>
                        <TouchableOpacity onPress={() => navigation.navigate("RegisterPerson")}>
                            <Text style={[styles.navLink, {marginTop: 20}]}>
                                Persönliche Informationen
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.statusText}>Unvollständig</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("RegisterFahrzeug")}>
                            <Text style={[styles.navLink]}>Fahrzeuginformationen</Text>
                        </TouchableOpacity>
                        <Text style={styles.statusText}>Unvollständig</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("RegisterGebietPreis")}
                        >
                            <Text style={[styles.navLink]}>Gebiet & Preis</Text>
                        </TouchableOpacity>
                        <Text style={styles.statusText}>Unvollständig</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("RegisterArbeitszeiten")}
                        >
                            <Text style={[styles.navLink]}>Arbeitszeiten</Text>
                        </TouchableOpacity>
                        <Text style={styles.statusText}>Unvollständig</Text>
                    </View>
                    <View>
                        <Button
                            title={registered ? "Speichern" : "Account erstellen"}
                            onPress={() => {
                                register();
                                navigation.navigate("TourStarten");
                            }}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonTitle}
                            containerStyle={styles.buttonContainer}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        marginBottom: "-20%",
    },
    logout: {
        position: "absolute",
        top: 50,
        right: 30,
        zIndex: 10,
    },
    contentWrap: {
        top: "-4%",
        backgroundColor: "#FFF",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        paddingBottom: "45%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -10000},
        shadowOpacity: 0.1,
        shadowRadius: 2.84,
        elevation: 5,
    },
    contentInner: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        paddingTop: "1%",
        marginBottom: "20%",
    },
    navLink: {
        color: "#65697A",
        fontSize: 23,
        fontWeight: "bold",
        padding: 10,
    },
    statusText: {
        color: "#D4CCC3",
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        borderRadius: 40,
        height: 52,
        width: "102%",
    },
    buttonTitle: {
        fontWeight: "bold",
        fontSize: 26,
    },
    buttonContainer: {
        marginTop: "-10%",
    },
});