import {AntDesign, FontAwesome, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import {Formik} from "formik";
import React from "react";
import {Alert, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";

export function RegisterPerson({navigation}) {
    return (
        <ScrollView>
            <View>
                <View style={{paddingLeft: 60, paddingTop: "20%", alignItems: "flex-start", paddingBottom: 40, backgroundColor: "#F2F2F2"}}>
                    <Text style={styles.header}>Persönliche{"\n"}Daten</Text>
                    <Text style={styles.subheader}>eingeben und verändern</Text>
                </View>
            </View>
            <View style={{paddingTop: "4%", padding: 20, borderRadius: 25, backgroundColor: "#FFF", height: "100%"}}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <AntDesign name={"close"} size={20} color="#f89e3b" />
                </TouchableOpacity>
                <Formik
                    initialValues={{firstName: "", lastName: "", streetName: "", postCode: "", province: ""}}
                    onSubmit={values => {
                        Alert.alert(JSON.stringify(values, null, 2));
                        Keyboard.dismiss();
                    }}>
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
                                        onChangeText={handleChange("streetName")}
                                        value={values.streetName}
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
                                <View style={[styles.inputWrap, {padding: 0, alignItems: "flex-start", justifyContent: "space-around"}]}>
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
                                        onChangeText={handleChange("streetName")}
                                        value={values.streetName}
                                        label="Mobiltelefon"
                                        placeholder="Mobiltelefon"
                                    />
                                </View>
                            </View>
                            <View style={{alignItems: "center", marginTop: 50}}>
                                <Button
                                    buttonStyle={styles.button}
                                    titleStyle={styles.buttonTitle}
                                    disabled={false}
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
}

export const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        color: "#729628",
        fontWeight: "800"
    },
    subheader: {
        fontSize: 20,
        color: "#729628"
    },
    input: {
        backgroundColor: "#FFF",
        width: "90%",
        paddingRight: "5%"
    },
    halfInput: {
        backgroundColor: "#FFF",
        width: "45%",
        paddingRight: "5%"
    },
    inputWrap: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingVertical: 10
    },
    button: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: 200,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTitle: {
        fontSize: 22,
        fontWeight: "800"
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});