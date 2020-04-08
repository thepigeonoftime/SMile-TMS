import {AntDesign, FontAwesome, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import {Formik} from "formik";
import React from "react";
import {Alert, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import {Header} from "../Header";

export const RegisterPerson = ({navigation}) => {
    return (
        <ScrollView>
            <View>
                <Header
                    text={"Persönliche\nDaten"}
                    subText="eingeben und verändern"
                    color="#729628"
                />
            </View>
            <View style={styles.formContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <AntDesign name={"close"} size={20} color="#f89e3b" />
                </TouchableOpacity>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        company: "",
                        streetName: "",
                        postCode: "",
                        province: "",
                        phone: "",
                    }}
                    onSubmit={(values) => {
                        Alert.alert(JSON.stringify(values, null, 2));
                        Keyboard.dismiss();
                    }}
                >
                    {({handleChange, handleSubmit, values}) => (
                        <View>
                            <View>
                                <View style={styles.inputWrap}>
                                    <SimpleLineIcons name="user" size={25} color="#ccc" />
                                    <Input
                                        containerStyle={styles.input}
                                        onChangeText={handleChange("firstName")}
                                        value={values.firstName}
                                        label="Vorname"
                                        placeholder="Vorname"
                                    />
                                </View>
                                <View style={styles.inputWrap}>
                                    <SimpleLineIcons name="user" size={25} color="#FFF" />
                                    <Input
                                        containerStyle={styles.input}
                                        onChangeText={handleChange("lastName")}
                                        value={values.lastName}
                                        label="Nachname"
                                        placeholder="Nachname"
                                    />
                                </View>
                                <View style={styles.inputWrap}>
                                    <MaterialIcons name="store" size={30} color="#ccc" />
                                    <Input
                                        containerStyle={styles.input}
                                        style={styles.input}
                                        onChangeText={handleChange("company")}
                                        value={values.company}
                                        label="Firma"
                                        placeholder="Firma"
                                    />
                                </View>
                                <View style={styles.inputWrap}>
                                    <FontAwesome name="map-signs" size={25} color="#ccc" />
                                    <Input
                                        containerStyle={styles.input}
                                        style={styles.input}
                                        onChangeText={handleChange("streetName")}
                                        value={values.streetName}
                                        label="Straße"
                                        placeholder="Straße"
                                    />
                                </View>
                                <View style={[styles.inputWrap, styles.halfInputContainer]}>
                                    <SimpleLineIcons name="user" size={25} color="#fff" />
                                    <Input
                                        containerStyle={styles.halfInput}
                                        style={styles.input}
                                        onChangeText={handleChange("postCode")}
                                        value={values.postCode}
                                        label="Postleitzahl"
                                        placeholder="Postleitzahl"
                                    />
                                    <Input
                                        containerStyle={styles.halfInput}
                                        style={styles.input}
                                        onChangeText={handleChange("province")}
                                        value={values.province}
                                        label="Ort"
                                        placeholder="Ort"
                                    />
                                </View>
                                <View style={styles.inputWrap}>
                                    <MaterialIcons name="phone-android" size={25} color="#ccc" />
                                    <Input
                                        containerStyle={styles.input}
                                        style={styles.input}
                                        onChangeText={handleChange("phone")}
                                        value={values.phone}
                                        label="Mobiltelefon"
                                        placeholder="Mobiltelefon"
                                    />
                                </View>
                            </View>
                            <View style={styles.saveButtonContainer}>
                                <Button
                                    buttonStyle={styles.saveButton}
                                    titleStyle={styles.saveButtonTitle}
                                    disabledStyle={styles.saveButtonDisabled}
                                    disabled={true}
                                    title="Speichern"
                                    onPress={() => {
                                        handleSubmit;
                                        navigation.goBack();
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

export const styles = StyleSheet.create({
    formContainer: {
        paddingTop: "4%",
        padding: 20,
        borderRadius: 25,
        backgroundColor: "#FFF",
        height: "100%",
        paddingBottom: "30%",
    },
    input: {
        backgroundColor: "#FFF",
        width: "90%",
        paddingRight: "5%",
    },
    halfInputContainer: {
        paddingLeft: "0.7%",
    },
    halfInput: {
        backgroundColor: "#FFF",
        width: "45%",
        paddingRight: "5%",
    },
    inputWrap: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingVertical: 10,
    },
    closeButton: {
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 30,
        borderColor: "#FFF",
        position: "absolute",
        top: -20,
        right: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    saveButtonContainer: {
        alignItems: "center",
        marginTop: 50,
    },
    saveButton: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: 200,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    saveButtonTitle: {
        fontSize: 22,
        fontWeight: "800",
    },
    saveButtonDisabled: {
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: "#ccc",
    },
});
