import {AntDesign, Entypo, FontAwesome, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import React, {useContext} from "react";
import {Controller, useForm} from "react-hook-form";
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {Button, Input} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import * as Yup from "yup";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";

export const RegisterFahrzeug = ({navigation}) => {
    const {dataFahrzeug, storeDataFahrzeug} = useContext(RegisterContext);

    const registerSchema = Yup.object().shape({
        fahrzeugArt: Yup.string().nullable().required("Benötigt"),
        ladevolumen: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
        laenge: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
        breite: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
        hoehe: Yup.string()
            .min(1, "Zu kurz")
            .max(10, "Zu lang")
            .matches(/^\d+$/, "Nur Zahlen")
            .required("Benötigt"),
    });

    const {setValue, handleSubmit, errors, triggerValidation, control, formState} = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        validationSchema: registerSchema,
        submitFocusError: true,
    });

    const onSubmit = (data) => {
        storeDataFahrzeug(data);
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
                    <Header text="Fahrzeugart" subText="auswählen" color="#729628" />
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
                                <Controller
                                    as={
                                        // tslint:disable-next-line jsx-wrap-multiline
                                        <RNPickerSelect
                                            onValueChange={(value) => {
                                                setValue("fahrzeugArt", value);
                                                triggerValidation("fahrzeugArt");
                                            }}
                                            items={[
                                                {
                                                    label: "Sprinter",
                                                    value: "Sprinter",
                                                },
                                                {label: "Golf", value: "Golf"},
                                                {label: "Bugatti", value: "Bugatti"},
                                            ]}
                                            placeholder={
                                                dataFahrzeug && dataFahrzeug.fahrzeugArt
                                                    ? {}
                                                    : {
                                                          label: "Fahrzeug wählen",
                                                          value: null,
                                                          style: {color: "#999", fontSize: 20},
                                                      }
                                            }
                                            value={dataFahrzeug && dataFahrzeug.fahrzeugArt}
                                            useNativeAndroidPickerStyle={false}
                                            style={{
                                                placeholder: {
                                                    fontSize: 18,
                                                },
                                                inputIOS: {
                                                    color: "#999",
                                                    fontSize: 18,
                                                },
                                                inputAndroid: {
                                                    color: "#999",
                                                    fontSize: 18,
                                                },
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
                                    }
                                    name="fahrzeugArt"
                                    control={control}
                                />
                            </View>
                            {errors.fahrzeugArt && (
                                <Text style={styles.error}>{errors.fahrzeugArt.message}</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.lineWrap}>
                            <SimpleLineIcons
                                style={styles.icon}
                                name="user"
                                size={25}
                                color="#ccc"
                            />
                            <Controller
                                as={<Input />}
                                control={control}
                                name="ladevolumen"
                                onChangeText={(text: number) => {
                                    setValue("ladevolumen", text);
                                    errors.ladevolumen && triggerValidation("ladevolumen");
                                }}
                                label="Ladevolumen"
                                placeholder={
                                    dataFahrzeug && dataFahrzeug.ladevolumen
                                        ? dataFahrzeug.ladevolumen
                                        : "Volumen in qm² eingeben"
                                }
                                errorMessage={errors.ladevolumen ? errors.ladevolumen.message : " "}
                                inputStyle={styles.input}
                                containerStyle={styles.inputContainer}
                                inputWrapStyle={errors.ladevolumen && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>

                        <View style={styles.lineWrap}>
                            <MaterialIcons
                                style={styles.icon}
                                name="store"
                                size={30}
                                color="#ccc"
                            />
                            <Controller
                                as={<Input />}
                                control={control}
                                name="laenge"
                                onChangeText={(text) => {
                                    setValue("laenge", text);
                                    errors.laenge && triggerValidation("laenge");
                                }}
                                label="Länge der Sendung"
                                placeholder={
                                    dataFahrzeug && dataFahrzeug.laenge
                                        ? dataFahrzeug.laenge
                                        : "max. Länge in cm eingeben"
                                }
                                errorMessage={errors.laenge ? errors.laenge.message : " "}
                                inputStyle={styles.input}
                                containerStyle={styles.inputContainer}
                                inputWrapStyle={errors.laenge && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={styles.lineWrap}>
                            <FontAwesome
                                style={styles.icon}
                                name="map-signs"
                                size={25}
                                color="#ccc"
                            />
                            <Controller
                                as={<Input />}
                                control={control}
                                name="breite"
                                onChangeText={(text) => {
                                    setValue("breite", text);
                                    errors.breite && triggerValidation("breite");
                                }}
                                label="Breite der Sendung"
                                placeholder={
                                    dataFahrzeug && dataFahrzeug.breite
                                        ? dataFahrzeug.breite
                                        : "max. Breite in cm eingeben"
                                }
                                errorMessage={errors.breite ? errors.breite.message : " "}
                                inputStyle={styles.input}
                                containerStyle={styles.inputContainer}
                                inputWrapStyle={errors.breite && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={styles.lineWrap}>
                            <FontAwesome
                                style={styles.icon}
                                name="map-signs"
                                size={25}
                                color="#ccc"
                            />
                            <Controller
                                as={<Input />}
                                control={control}
                                name="hoehe"
                                onChangeText={(text) => {
                                    setValue("hoehe", text);
                                    errors.hoehe && triggerValidation("hoehe");
                                }}
                                label="Höhe der Sendung"
                                placeholder={
                                    dataFahrzeug && dataFahrzeug.hoehe
                                        ? dataFahrzeug.hoehe
                                        : "max. Höhe in cm eingeben"
                                }
                                errorMessage={errors.hoehe ? errors.hoehe.message : " "}
                                inputStyle={styles.input}
                                containerStyle={styles.inputContainer}
                                inputWrapStyle={errors.hoehe && styles.inputError}
                                errorStyle={styles.error}
                            />
                        </View>
                        <View style={styles.saveButtonContainer}>
                            <Button
                                buttonStyle={styles.saveButton}
                                titleStyle={styles.saveButtonTitle}
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
        top: "-7%",
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
        flexDirection: "row",
        alignContent: "flex-start",
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
        // flex: 1,
    },
    lineWrap: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 5,
        flex: 1,
    },
    icon: {
        flex: 1.5,
        marginTop: 10,
    },
    inputContainer: {
        backgroundColor: "#FFF",
        paddingRight: "5%",
        flex: 12,
    },
    input: {
        fontSize: 16.5,
        color: "#555",
    },
    pickerContainer: {
        flex: 40,
        flexDirection: "row",
        alignContent: "flex-end",
        justifyContent: "flex-end",
        paddingRight: "5%",
        paddingTop: 15,
        paddingBottom: 25,
        marginTop: 10,
    },
    pickerIconWrap: {
        flex: 1.3,
    },
    pickerIcon: {
        top: "15%",
    },
    pickerWrap: {
        flex: 8,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1.3,
    },
    pickerArrows: {
        paddingTop: 5,
        color: "#666",
    },
    // inputAndroid: {
    //     color: "#999"
    // },
    // inputIOS: {
    //     color: "#999"
    // },
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
});
