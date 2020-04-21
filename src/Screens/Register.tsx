import React, {useContext, useEffect} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from "react-native";
import {Button} from "react-native-elements";
import {AuthContext} from "../AuthProvider";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";

export const Register = ({navigation}) => {
    const {logout} = useContext(AuthContext);
    const {
        register,
        registered,
        dataPerson,
        dataFahrzeug,
        dataGebiet,
        dataZeiten,
        storeDataPerson,
        storeDataFahrzeug,
        storeDataGebiet,
        storeDataZeiten,
    } = useContext(RegisterContext);

    useEffect(() => {
        AsyncStorage.getItem("dataPerson")
            .then((data) => {
                if (data) {
                    storeDataPerson(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        AsyncStorage.getItem("dataFahrzeug")
            .then((data) => {
                console.log("register.tsx df: " + data);
                if (data) {
                    storeDataFahrzeug(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        AsyncStorage.getItem("dataGebiet")
            .then((data) => {
                if (data) {
                    storeDataGebiet(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        AsyncStorage.getItem("dataZeiten")
            .then((data) => {
                if (data) {
                    storeDataZeiten(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <ScrollView style={styles.container}>
            <View>
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
                        {dataPerson ? (
                            <Text style={styles.statusComplete}>Vollständig</Text>
                        ) : (
                            <Text style={styles.statusIncomplete}>Unvollständig</Text>
                        )}

                        <TouchableOpacity onPress={() => navigation.navigate("RegisterFahrzeug")}>
                            <Text style={[styles.navLink]}>Fahrzeuginformationen</Text>
                        </TouchableOpacity>
                        {dataFahrzeug ? (
                            <Text style={styles.statusComplete}>Vollständig</Text>
                        ) : (
                            <Text style={styles.statusIncomplete}>Unvollständig</Text>
                        )}
                        <TouchableOpacity
                            onPress={() => navigation.navigate("RegisterGebietPreis")}
                        >
                            <Text style={[styles.navLink]}>Gebiet & Preis</Text>
                        </TouchableOpacity>
                        {dataGebiet ? (
                            <Text style={styles.statusComplete}>Vollständig</Text>
                        ) : (
                            <Text style={styles.statusIncomplete}>Unvollständig</Text>
                        )}
                        <TouchableOpacity
                            onPress={() => navigation.navigate("RegisterArbeitszeiten")}
                        >
                            <Text style={[styles.navLink]}>Arbeitszeiten</Text>
                        </TouchableOpacity>
                        {dataZeiten ? (
                            <Text style={styles.statusComplete}>Vollständig</Text>
                        ) : (
                            <Text style={styles.statusIncomplete}>Unvollständig</Text>
                        )}
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
                            disabled={
                                registered
                                    ? false
                                    : !(dataPerson && dataFahrzeug && dataGebiet && dataZeiten)
                            }
                        />
                        {/* <View style={{alignItems: "center"}}>
                            <TouchableOpacity
                                onPress={() => {
                                    register();
                                }}
                            >
                                <Text>register</Text>
                            </TouchableOpacity>
                        </View> */}
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
        top: "-5%",
        backgroundColor: "#FFF",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        paddingBottom: "45%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
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
    statusIncomplete: {
        color: "#D4CCC3",
        marginLeft: 10,
        fontSize: 16,
    },
    statusComplete: {
        color: "#729628",
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
