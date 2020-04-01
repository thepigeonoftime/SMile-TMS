import {AntDesign, Entypo, FontAwesome, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import {Formik} from "formik";
import React, {useState} from "react";
import {
    Alert,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from "react-native";
import {Button, Input} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import {Header} from "./Header";

export function RegisterFahrzeug({navigation}) {
    const [pickVal, setPickVal] = useState("java");
    return (
        <ScrollView>
            <View>
                <Header text="Fahrzeugart" subText="auswählen" color="#729628" />
            </View>
            <View style={styles.closeButtonContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <AntDesign name={"close"} size={20} color="#f89e3b" />
                </TouchableOpacity>
                <Formik
                    initialValues={{
                        fahrzeugArt: "",
                        Ladevolumen: "",
                        Laenge: "",
                        Breite: "",
                        Hoehe: ""
                    }}
                    onSubmit={values => {
                        Alert.alert(JSON.stringify(values, null, 2));
                        Keyboard.dismiss();
                    }}
                >
                    {({handleChange, handleSubmit, values}) => (
                        <View>
                            <View>
                                <View style={styles.fahrzeugContainer}>
                                    <View style={styles.pickerContainer}>
                                        <View style={styles.pickerIconWrap}>
                                            <AntDesign
                                                name="car"
                                                style={styles.pickerIcon}
                                                size={25}
                                                color="#ccc"
                                            />
                                        </View>
                                        <View style={styles.pickerWrap}>
                                            <RNPickerSelect
                                                onValueChange={value => console.log(value)}
                                                items={[
                                                    {label: "Sprinter", value: "Sprinter"},
                                                    {label: "Golf", value: "Golf"},
                                                    {label: "Bugatti", value: "Bugatti"}
                                                ]}
                                                placeholder={{
                                                    label: "Fahrzeug wählen",
                                                    value: null,
                                                    style: {color: "#999", fontSize: 20}
                                                }}
                                                useNativeAndroidPickerStyle={false}
                                                style={{
                                                    placeholder: {
                                                        fontSize: 18
                                                    }
                                                }}
                                                Icon={() => {
                                                    return (
                                                        <Entypo
                                                            name="select-arrows"
                                                            style={styles.pickerArrows}
                                                        />
                                                    );
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrap}>
                                        <SimpleLineIcons
                                            style={styles.icon}
                                            name="user"
                                            size={25}
                                            color="#ccc"
                                        />
                                        <Input
                                            containerStyle={styles.input}
                                            onChangeText={handleChange("Ladevolumen")}
                                            value={values.Ladevolumen}
                                            label="Ladevolumen"
                                            placeholder="Volumen in qm² eingeben"
                                        />
                                    </View>

                                    <View style={styles.inputWrap}>
                                        <MaterialIcons
                                            style={styles.icon}
                                            name="store"
                                            size={25}
                                            color="#ccc"
                                        />
                                        <Input
                                            containerStyle={styles.input}
                                            style={styles.input}
                                            onChangeText={handleChange("Laenge")}
                                            value={values.Laenge}
                                            label="Länge der Sendung"
                                            placeholder="max. Länge in cm eingeben"
                                        />
                                    </View>
                                    <View style={styles.inputWrap}>
                                        <FontAwesome
                                            style={styles.icon}
                                            name="map-signs"
                                            size={25}
                                            color="#ccc"
                                        />
                                        <Input
                                            containerStyle={styles.input}
                                            style={styles.input}
                                            onChangeText={handleChange("Breite")}
                                            value={values.Breite}
                                            label="Breite der Sendung"
                                            placeholder="max. Breite in cm eingeben"
                                        />
                                    </View>
                                    <View style={styles.inputWrap}>
                                        <FontAwesome
                                            style={styles.icon}
                                            name="map-signs"
                                            size={25}
                                            color="#ccc"
                                        />
                                        <Input
                                            containerStyle={styles.input}
                                            style={styles.input}
                                            onChangeText={handleChange("Hoehe")}
                                            value={values.Hoehe}
                                            label="Höhe der Sendung"
                                            placeholder="max. Höhe in cm eingeben"
                                        />
                                    </View>
                                    <View style={styles.saveButtonContainer}>
                                        <Button
                                            buttonStyle={styles.saveButton}
                                            titleStyle={styles.saveButtonTitle}
                                            disabled={false}
                                            title="Speichern"
                                            onPress={() => {
                                                handleSubmit;
                                                navigation.goBack();
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
}

export const styles = StyleSheet.create({
    closeButtonContainer: {
        paddingTop: "5%",
        padding: 20,
        borderRadius: 25,
        backgroundColor: "#FFF",
        height: "100%"
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
    },
    inputContainer: {
        flex: 1
    },
    inputWrap: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingVertical: 10,
        flex: 1
    },
    icon: {
        flex: 1.2
    },
    input: {
        backgroundColor: "#FFF",
        paddingRight: "5%",
        flex: 12
    },
    fahrzeugContainer: {
        flexDirection: "row",
        alignContent: "flex-start",
        paddingBottom: 10
    },
    pickerContainer: {
        flex: 40,
        flexDirection: "row",
        alignContent: "flex-end",
        justifyContent: "flex-end",
        paddingRight: "5%",
        paddingTop: 15,
        paddingBottom: 5,
        marginTop: 10
    },
    pickerIconWrap: {
        flex: 1.2
    },
    pickerIcon: {
        top: "15%"
    },
    pickerWrap: {
        flex: 8,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1.3
    },
    pickerArrows: {
        paddingTop: 5,
        color: "#666"
    },
    // inputAndroid: {
    //     color: "#999"
    // },
    // inputIOS: {
    //     color: "#999"
    // },
    saveButtonContainer: {
        alignItems: "center",
        marginTop: 50
    },
    saveButton: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: 200,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    saveButtonTitle: {
        fontSize: 22,
        fontWeight: "800"
    }
});
