import {AntDesign, FontAwesome, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import React, {useContext} from "react";
import {Controller, useForm} from "react-hook-form";
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {Button, Input} from "react-native-elements";
import * as Yup from "yup";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";

export const RegisterPerson = ({navigation}) => {
    const {storeDataPerson} = useContext(RegisterContext);

    const validationSchema = Yup.object().shape({
        vorname: Yup.string()
            .min(2, "Zu kurz")
            .max(20, "Zu lang")
            // .matches(/^[a-zA-Z]$/, "Nur Buchstaben")
            .required("Benötigt"),
        nachname: Yup.string()
            .min(2, "Zu kurz")
            .max(20, "Zu lang")
            // .matches(/^[a-zA-Z]$/, "Nur Buchstaben")
            .required("Benötigt"),
        firma: Yup.string().min(2, "Zu kurz").max(30, "Zu lang").required("Benötigt"),
        strasse: Yup.string().min(2, "Zu kurz").max(30, "Zu lang").required("Benötigt"),
        hausnummer: Yup.string()
            .min(1, "Zu kurz")
            .max(7, "Zu lang")
            .matches(/^\d/gi, "Ungültig")
            .required("Benötigt"),
        plz: Yup.string()
            .matches(/^[0-9]{5}$/, "5-stellige Zahl")
            .required("Benötigt"),
        ort: Yup.string()
            .min(2, "Zu kurz")
            .max(50, "Zu lang")
            // .matches(/^[a-zA-Z]$/, "Nur Buchstaben")
            .required("Benötigt"),
        telefon: Yup.string().matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Telefonnummer nicht gültig"
        ),
    });

    const {setValue, handleSubmit, errors, triggerValidation, control, formState} = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        validationSchema: validationSchema,
        submitFocusError: true,
    });
    const onSubmit = (data) => {
        storeDataPerson(data);
        navigation.goBack();
    };
    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#FFF",
            }}
            behavior="padding"
        >
            <ScrollView>
                <View>
                    <Header
                        text={"Persönliche\nDaten"}
                        subText="eingeben und verändern"
                        // color="#729628"
                        bgColor="#F2F2F2"
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.closeButton}
                        >
                            <AntDesign name={"close"} size={20} color="#f89e3b" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.inputWrap}>
                            <SimpleLineIcons
                                name="user"
                                size={25}
                                color="#ccc"
                                style={{marginTop: 10}}
                            />
                            <Controller
                                as={<Input />}
                                name={"vorname"}
                                control={control}
                                label="Vorname"
                                placeholder="Vornamen eingeben"
                                onChangeText={(text) => {
                                    setValue("vorname", text);
                                }}
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^\b\w{2,40}\b/,
                                        message: "Ungültig",
                                    },
                                }}
                                errorMessage={errors.vorname ? errors.vorname.message + " " : " "}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={errors.vorname && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <SimpleLineIcons name="user" size={25} color="#FFF" />
                            <Controller
                                as={<Input />}
                                name={"nachname"}
                                control={control}
                                label="Nachname"
                                placeholder="Nachnamen eingeben"
                                onChangeText={(text) => setValue("nachname", text)}
                                errorMessage={errors.nachname ? errors.nachname.message : " "}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={errors.nachname && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <MaterialIcons name="store" size={30} color="#ccc" />
                            <Controller
                                as={<Input />}
                                name={"firma"}
                                control={control}
                                label="Firma"
                                placeholder="Firmenname eingeben"
                                onChangeText={(text) => setValue("firma", text)}
                                errorMessage={errors.firma ? errors.firma.message : " "}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={errors.firma && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <FontAwesome name="map-signs" size={25} color="#ccc" />
                            <Controller
                                as={<Input />}
                                name={"strasse"}
                                control={control}
                                label="Straße / Hausnummer"
                                placeholder="Straße eingeben"
                                onChangeText={(text) => setValue("strasse", text)}
                                errorMessage={errors.strasse ? errors.strasse.message : " "}
                                containerStyle={styles.strasseInputContainer}
                                inputContainerStyle={errors.strasse && styles.inputError}
                                errorStyle={styles.error}
                            />
                            <Controller
                                as={<Input />}
                                name={"hausnummer"}
                                control={control}
                                label=" "
                                placeholder="Nr."
                                onChangeText={(text) => {
                                    setValue("hausnummer", text);
                                    errors.hausnummer && triggerValidation("hausnummer");
                                }}
                                errorMessage={errors.hausnummer ? errors.hausnummer.message : " "}
                                containerStyle={styles.nrInputContainer}
                                inputContainerStyle={errors.hausnummer && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={[styles.inputWrap, styles.halfInputWrap]}>
                            <SimpleLineIcons name="user" size={25} color="#fff" />
                            <Controller
                                as={<Input />}
                                name={"plz"}
                                control={control}
                                label="Postleitzahl"
                                placeholder="Postleitzahl"
                                onChangeText={(text) => {
                                    setValue("plz", text);
                                    errors.plz && triggerValidation("plz");
                                }}
                                errorMessage={errors.plz ? errors.plz.message : " "}
                                inputStyle={styles.input}
                                containerStyle={styles.halfInputContainer}
                                inputContainerStyle={errors.plz && styles.inputError}
                                errorStyle={styles.error}
                            />
                            <Controller
                                as={<Input />}
                                name={"ort"}
                                control={control}
                                label="Ort"
                                placeholder="Ort"
                                onChangeText={(text) => setValue("ort", text)}
                                errorMessage={errors.ort ? errors.ort.message : " "}
                                containerStyle={styles.halfInputContainer}
                                inputContainerStyle={errors.ort && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <MaterialIcons name="phone-android" size={25} color="#ccc" />
                            <Controller
                                as={<Input />}
                                name={"telefon"}
                                control={control}
                                label="Mobiltelefon"
                                placeholder="Mobiltelefon"
                                onChangeText={(text) => {
                                    setValue("telefon", text);
                                    errors.telefon && triggerValidation("telefon");
                                }}
                                errorMessage={errors.telefon ? errors.telefon.message : " "}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={errors.telefon && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={styles.saveButtonContainer}>
                            <Button
                                buttonStyle={styles.saveButton}
                                titleStyle={styles.saveButtonTitle}
                                disabledStyle={styles.saveButtonDisabled}
                                disabled={!formState.isValid}
                                title="Speichern"
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export const styles = StyleSheet.create({
    container: {
        top: "-5%",
        padding: 20,
        borderRadius: 25,
        backgroundColor: "#FFF",
        height: "100%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 2.84,
        elevation: 5,
    },
    formContainer: {
        paddingTop: 0,
        padding: 20,
        borderRadius: 25,
        backgroundColor: "#FFF",
        // height: "100%",
    },
    closeButtonContainer: {
        alignItems: "flex-end",
        padding: 5,
        marginTop: -40,
        marginRight: 20,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputWrap: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    input: {
        color: "#555",
    },
    inputContainer: {
        backgroundColor: "#FFF",
        width: "90%",
        paddingRight: "5%",
    },
    strasseInputContainer: {
        width: "65%",
    },
    nrInputContainer: {
        width: "25%",
    },
    halfInputWrap: {
        paddingLeft: "0.7%",
    },
    halfInputContainer: {
        backgroundColor: "#FFF",
        width: "45%",
        paddingRight: "5%",
    },
    inputError: {
        borderColor: "#ff8787",
    },
    error: {
        color: "#ff8787",
        marginLeft: -1,
    },
    saveButtonContainer: {
        alignItems: "center",
        marginTop: 30,
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
