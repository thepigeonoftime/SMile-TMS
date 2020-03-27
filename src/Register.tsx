import React, {useContext} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import {AuthContext} from "./AuthProvider";
import {RegisterContext} from "./RegisterProvider";

export const Register = ({navigation}) => {
    const {logout} = useContext(AuthContext);
    const {registered, register} = useContext(RegisterContext);
    return (
        <View>
            <View style={{paddingTop: "30%", justifyContent: "center", alignContent: "center"}}>
                <TouchableOpacity onPress={() => navigation.navigate("infoPerson")}>
                    <Text style={[styles.navLink, {marginTop: 20}]}>Persönliche Informationen</Text>
                </TouchableOpacity>
                <Text style={styles.statusText}>Unvollständig</Text>
                <TouchableOpacity onPress={() => navigation.navigate("infoFahrzeug")}>
                    <Text style={[styles.navLink]}>Fahrzeuginformationen</Text>
                </TouchableOpacity>
                <Text style={styles.statusText}>Unvollständig</Text>
                <TouchableOpacity onPress={() => navigation.navigate("infoGebietPreis")}>
                    <Text style={[styles.navLink]}>Gebiet & Preis</Text>
                </TouchableOpacity>
                <Text style={styles.statusText}>Unvollständig</Text>
                <TouchableOpacity onPress={() => navigation.navigate("infoArbeitszeiten")}>
                    <Text style={[styles.navLink]}>Arbeitszeiten</Text>
                </TouchableOpacity>
                <Text style={styles.statusText}>Unvollständig</Text>
            </View>
            <View>
                <Button
                    title="Abschließen"
                    onPress={() => {
                        register();
                    }}
                    buttonStyle={{borderRadius: 20, height: 45, width: 200}}></Button>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {},
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
    }
});
