import {AntDesign, FontAwesome, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import {Formik} from "formik";
import React from "react";
import {
    Alert,
    Keyboard,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
} from "react-native";
import {Button, Input} from "react-native-elements";
import {Header} from "../Header";
import {Controller, useForm} from "react-hook-form";
import * as Yup from "yup";

export const RegisterGebietPreis = ({navigation}) => {
    const registerSchema = Yup.object().shape({
        zustellGebietPLZ: Yup.string()
            .matches(/^[0-9]{5}$/, "5-stellige Zahl")
            .required("Benötigt"),
        entfernungTour: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
        vorlaufZeit: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
        grundpreis: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
        preisProKm: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
        preisProStop: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
    });
    const {
        register,
        setValue,
        handleSubmit,
        errors,
        triggerValidation,
        control,
        formState,
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        validationSchema: registerSchema,
        submitFocusError: true,
    });
    const onSubmit = (data) => {
        Alert.alert("Form Data", JSON.stringify(data));
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
                    <Header text={"Zustellgebiet &\nPreise"} color="#729628" />
                </View>
                <View style={styles.formContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name={"close"} size={20} color="#f89e3b" />
                    </TouchableOpacity>
                    <View>
                        <View>
                            <View style={styles.inputWrap}>
                                <SimpleLineIcons name="user" size={25} color="#ccc" />
                                <Controller
                                    as={<Input />}
                                    control={control}
                                    name="zustellGebietPLZ"
                                    onChangeText={(text: number) => {
                                        setValue("zustellGebietPLZ", text);
                                        errors.zustellGebietPLZ &&
                                            triggerValidation("zustellGebietPLZ");
                                    }}
                                    label="Postleitzahl Zustellgebiet"
                                    placeholder="PLZ eingeben"
                                    errorMessage={
                                        errors.zustellGebietPLZ
                                            ? errors.zustellGebietPLZ.message
                                            : " "
                                    }
                                    containerStyle={styles.input}
                                    inputContainerStyle={
                                        errors.zustellGebietPLZ && styles.inputError
                                    }
                                    errorStyle={styles.error}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <SimpleLineIcons name="user" size={25} color="#FFF" />
                                <Controller
                                    as={<Input />}
                                    control={control}
                                    name="entfernungTour"
                                    onChangeText={(text: number) => {
                                        setValue("entfernungTour", text);
                                        errors.entfernungTour &&
                                            triggerValidation("entfernungTour");
                                    }}
                                    label="Entfernung je Tour"
                                    placeholder="Entfernung in km eingeben"
                                    errorMessage={
                                        errors.entfernungTour ? errors.entfernungTour.message : " "
                                    }
                                    containerStyle={styles.input}
                                    inputContainerStyle={errors.entfernungTour && styles.inputError}
                                    errorStyle={styles.error}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <MaterialIcons name="store" size={30} color="#ccc" />
                                <Controller
                                    as={<Input />}
                                    control={control}
                                    name="vorlaufZeit"
                                    onChangeText={(text: number) => {
                                        setValue("vorlaufZeit", text);
                                        errors.vorlaufZeit && triggerValidation("vorlaufZeit");
                                    }}
                                    label="Vorlaufzeit bis Tour-Start"
                                    placeholder="Vorlaufzeit in Minuten angeben"
                                    errorMessage={
                                        errors.vorlaufZeit ? errors.vorlaufZeit.message : " "
                                    }
                                    containerStyle={styles.input}
                                    inputContainerStyle={errors.vorlaufZeit && styles.inputError}
                                    errorStyle={styles.error}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <FontAwesome name="map-signs" size={25} color="#ccc" />
                                <Controller
                                    as={<Input />}
                                    control={control}
                                    name="grundpreis"
                                    onChangeText={(text: number) => {
                                        setValue("grundpreis", text);
                                        errors.grundpreis && triggerValidation("grundpreis");
                                    }}
                                    label="Grundpreis pro Tour"
                                    placeholder="Grundpreis in EUR eingeben"
                                    errorMessage={
                                        errors.grundpreis ? errors.grundpreis.message : " "
                                    }
                                    containerStyle={styles.input}
                                    inputContainerStyle={errors.grundpreis && styles.inputError}
                                    errorStyle={styles.error}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <FontAwesome name="map-signs" size={25} color="#ccc" />
                                <Controller
                                    as={<Input />}
                                    control={control}
                                    name="preisProKm"
                                    onChangeText={(text: number) => {
                                        setValue("preisProKm", text);
                                        errors.preisProKm && triggerValidation("preisProKm");
                                    }}
                                    label="Preis pro km"
                                    placeholder="Kilometerpreis in EUR eingeben"
                                    errorMessage={
                                        errors.preisProKm ? errors.preisProKm.message : " "
                                    }
                                    containerStyle={styles.input}
                                    inputContainerStyle={errors.preisProKm && styles.inputError}
                                    errorStyle={styles.error}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <MaterialIcons name="phone-android" size={25} color="#ccc" />
                                <Controller
                                    as={<Input />}
                                    control={control}
                                    name="preisProStop"
                                    onChangeText={(text: number) => {
                                        setValue("preisProStop", text);
                                        errors.preisProStop && triggerValidation("preisProStop");
                                    }}
                                    label="Preis pro Stop"
                                    placeholder="Preis pro Stop in EUR eingeben"
                                    errorMessage={
                                        errors.preisProStop ? errors.preisProStop.message : " "
                                    }
                                    containerStyle={styles.input}
                                    inputContainerStyle={errors.preisProStop && styles.inputError}
                                    errorStyle={styles.error}
                                />
                            </View>
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
    inputWrap: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
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
    inputError: {
        borderColor: "#ff8787",
    },
    error: {
        color: "#ff8787",
        marginLeft: -1,
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
