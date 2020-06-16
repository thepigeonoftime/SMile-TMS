import {AntDesign} from "@expo/vector-icons";
import moment from "moment";
import React, {useState, useContext, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {Button, Input} from "react-native-elements";
import {Switch, Text} from "react-native-paper";
import * as yup from "yup";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";
import {resultProps} from "../Types";

export const RegisterZeiten = ({navigation}) => {
    const {dataZeiten, storeDataZeiten} = useContext(RegisterContext);

    const [isEnabled, setIsEnabled] = useState({
        monday: dataZeiten && dataZeiten.monday && dataZeiten.monday.day ? true : false,
        tuesday: dataZeiten && dataZeiten.tuesday && dataZeiten.tuesday.day ? true : false,
        wednesday: dataZeiten && dataZeiten.wednesday && dataZeiten.wednesday.day ? true : false,
        thursday: dataZeiten && dataZeiten.thursday && dataZeiten.thursday.day ? true : false,
        friday: dataZeiten && dataZeiten.friday && dataZeiten.friday.day ? true : false,
        saturday: dataZeiten && dataZeiten.saturday && dataZeiten.saturday.day ? true : false,
    });

    const toggleSwitch = (key) => {
        setIsEnabled({...isEnabled, [key]: !isEnabled[key]});
    };

    const timeSchema = yup.string().test("is-time", "Ungültig", function (value) {
        if (value) {
            return moment(value, "HH:mm", true).isValid();
        } else {
            return true;
        }
    });

    const validationSchema = yup.object().shape({
        monStart: timeSchema,
        monEnd: timeSchema,
        tueStart: timeSchema,
        tueEnd: timeSchema,
        wedStart: timeSchema,
        wedEnd: timeSchema,
        thuStart: timeSchema,
        thuEnd: timeSchema,
        friStart: timeSchema,
        friEnd: timeSchema,
        satStart: timeSchema,
        satEnd: timeSchema,
    });

    // save last keystroke in input fields to capture backspaces
    let lastKey = "";

    const formatTime = (time) => {
        // automaticall add ":00" to time input to only allow full hours
        time.length > 1 && (time += ":00");
        return time;
    };

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        errors,
        triggerValidation,
        control,
        formState,
        setError,
        clearError,
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        validationSchema: validationSchema,
        submitFocusError: true,
    });

    const isGreater = (start, end, errorField) => {
        if (moment(getValues(start), "HH:mm").isSameOrAfter(moment(getValues(end), "HH:mm"))) {
            setError(errorField, "", "Startzeit muss vor Endzeit liegen");
        } else {
            clearError(errorField);
        }
    };

    const onSubmit = (data) => {
        let result: resultProps = {};
        const makeResult = (key, obj) => {
            // reject time inputs with empty fields
            if (!Object.values(obj).includes(undefined)) {
                result[key] = obj;
            }
        };

        makeResult("monday", {
            day: isEnabled.monday ? "MONDAY" : undefined,
            startTime: data.monStart,
            endTime: data.monEnd,
        });
        makeResult("tuesday", {
            day: isEnabled.tuesday ? "TUESDAY" : undefined,
            startTime: data.tueStart,
            endTime: data.tueEnd,
        });
        makeResult("wednesday", {
            day: isEnabled.wednesday ? "WEDNESDAY" : undefined,
            startTime: data.wedStart,
            endTime: data.wedEnd,
        });
        makeResult("thursday", {
            day: isEnabled.thursday ? "THURSDAY" : undefined,
            startTime: data.thuStart,
            endTime: data.thuEnd,
        });
        makeResult("friday", {
            day: isEnabled.friday ? "FRIDAY" : undefined,
            startTime: data.friStart,
            endTime: data.friEnd,
        });
        makeResult("saturday", {
            day: isEnabled.saturday ? "SATURDAY" : undefined,
            startTime: data.satStart,
            endTime: data.satEnd,
        });
        console.log(result);
        storeDataZeiten(result, true);
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
            // behavior="padding"
        >
            <ScrollView>
                <View>
                    <Header text="Verfügbarkeit" subText="eingeben" color="#729628" />
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
                        <View style={styles.rowContainer}>
                            <View style={styles.labelWrap}>
                                <Text style={styles.labelSpacer} />
                                <Text style={styles.label}>Montag</Text>
                            </View>
                            <View style={styles.lineWrap}>
                                <AntDesign
                                    name="calendar"
                                    style={styles.icon}
                                    size={25}
                                    color="#ccc"
                                />

                                <Switch
                                    trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                    thumbColor={isEnabled.monday ? "#729628" : "#f4f3f4"}
                                    ios_backgroundColor="#e6e6e6"
                                    onValueChange={(value) => {
                                        toggleSwitch("monday");
                                    }}
                                    value={isEnabled.monday}
                                    style={styles.switch}
                                />
                                <View style={styles.inputWrap}>
                                    <Controller
                                        as={<Input />}
                                        control={control}
                                        name="monStart"
                                        onKeyPress={({nativeEvent}) => {
                                            lastKey = nativeEvent.key;
                                        }}
                                        onChangeText={(time) => {
                                            setValue(
                                                "monStart",
                                                lastKey === "Backspace" ? "" : formatTime(time)
                                            );
                                            lastKey = "";
                                            errors.monStart && triggerValidation("monStart");
                                        }}
                                        maxLength={5}
                                        placeholder={
                                            dataZeiten &&
                                            dataZeiten.monday &&
                                            dataZeiten.monday.start
                                                ? dataZeiten.monday.start
                                                : ""
                                        }
                                        errorMessage={
                                            errors.monStart ? errors.monStart.message : " "
                                        }
                                        containerStyle={styles.input}
                                        inputStyle={styles.inputText}
                                        keyboardType={"numeric"}
                                        inputContainerStyle={errors.monStart && styles.inputError}
                                        errorStyle={styles.error}
                                    />
                                    <Controller
                                        as={<Input />}
                                        control={control}
                                        name="monEnd"
                                        onKeyPress={({nativeEvent}) => {
                                            lastKey = nativeEvent.key;
                                        }}
                                        onChangeText={(time) => {
                                            setValue(
                                                "monEnd",
                                                lastKey === "Backspace" ? "" : formatTime(time)
                                            );
                                            lastKey = "";
                                            errors.monEnd && triggerValidation("monEnd");
                                        }}
                                        onBlur={() => {
                                            isGreater("monStart", "monEnd", "monday");
                                        }}
                                        maxLength={5}
                                        placeholder={
                                            dataZeiten && dataZeiten.monday && dataZeiten.monday.end
                                                ? dataZeiten.monday.end
                                                : ""
                                        }
                                        errorMessage={errors.monEnd ? errors.monEnd.message : " "}
                                        containerStyle={styles.input}
                                        inputStyle={styles.inputText}
                                        keyboardType={"numeric"}
                                        inputContainerStyle={errors.monEnd && styles.inputError}
                                        errorStyle={styles.error}
                                    />
                                </View>
                            </View>
                            <View style={styles.validation}>
                                <Text style={styles.validationText}>
                                    {errors.monday ? errors.monday.message : ""}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.labelWrap}>
                                    <Text style={styles.labelSpacer} />
                                    <Text style={styles.label}>Dienstag</Text>
                                </View>
                                <View style={styles.lineWrap}>
                                    <AntDesign
                                        name="calendar"
                                        style={styles.icon}
                                        size={25}
                                        color="#ccc"
                                    />
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.tuesday ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("tuesday");
                                        }}
                                        value={isEnabled.tuesday}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="tueStart"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "tueStart",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.tueStart && triggerValidation("tueStart");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.tuesday &&
                                                dataZeiten.tuesday.start
                                                    ? dataZeiten.tuesday.start
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.tueStart ? errors.tueStart.message : " "
                                            }
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={
                                                errors.tueStart && styles.inputError
                                            }
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="tueEnd"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "tueEnd",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.tueEnd && triggerValidation("tueEnd");
                                            }}
                                            onBlur={() => {
                                                isGreater("tueStart", "tueEnd", "tuesday");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.tuesday &&
                                                dataZeiten.tuesday.end
                                                    ? dataZeiten.tuesday.end
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.tueEnd ? errors.tueEnd.message : " "
                                            }
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.tueEnd && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.validation}>
                                <Text style={styles.validationText}>
                                    {errors.tuesday ? errors.tuesday.message : ""}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.labelWrap}>
                                    <Text style={styles.labelSpacer} />
                                    <Text style={styles.label}>Mittwoch</Text>
                                </View>
                                <View style={styles.lineWrap}>
                                    <AntDesign
                                        name="calendar"
                                        style={styles.icon}
                                        size={25}
                                        color="#ccc"
                                    />
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.wednesday ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("wednesday");
                                        }}
                                        value={isEnabled.wednesday}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="wedStart"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "wedStart",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.wedStart && triggerValidation("wedStart");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.wednesday &&
                                                dataZeiten.wednesday.start
                                                    ? dataZeiten.wednesday.start
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.wedStart ? errors.wedStart.message : " "
                                            }
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={
                                                errors.wedStart && styles.inputError
                                            }
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="wedEnd"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "wedEnd",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.wedEnd && triggerValidation("wedEnd");
                                            }}
                                            onBlur={() => {
                                                isGreater("wedStart", "wedEnd", "wednesday");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.wednesday &&
                                                dataZeiten.wednesday.end
                                                    ? dataZeiten.wednesday.end
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.wedEnd ? errors.wedEnd.message : " "
                                            }
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.wedEnd && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.validation}>
                                <Text style={styles.validationText}>
                                    {errors.wednesday ? errors.wednesday.message : ""}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.labelWrap}>
                                    <Text style={styles.labelSpacer} />
                                    <Text style={styles.label}>Donnerstag</Text>
                                </View>
                                <View style={styles.lineWrap}>
                                    <AntDesign
                                        name="calendar"
                                        style={styles.icon}
                                        size={25}
                                        color="#ccc"
                                    />
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.thursday ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("thursday");
                                        }}
                                        value={isEnabled.thursday}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="thuStart"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "thuStart",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.thuStart && triggerValidation("thuStart");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.thursday &&
                                                dataZeiten.thursday.start
                                                    ? dataZeiten.thursday.start
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.thuStart ? errors.thuStart.message : " "
                                            }
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={
                                                errors.thuStart && styles.inputError
                                            }
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="thuEnd"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "thuEnd",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.thuEnd && triggerValidation("thuEnd");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.thursday &&
                                                dataZeiten.thursday.end
                                                    ? dataZeiten.thursday.end
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.thuEnd ? errors.thuEnd.message : " "
                                            }
                                            onBlur={() => {
                                                isGreater("thuStart", "thuEnd", "thursday");
                                            }}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.thuEnd && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.validation}>
                                <Text style={styles.validationText}>
                                    {errors.thursday ? errors.thursday.message : ""}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.labelWrap}>
                                    <Text style={styles.labelSpacer} />
                                    <Text style={styles.label}>Freitag</Text>
                                </View>
                                <View style={styles.lineWrap}>
                                    <AntDesign
                                        name="calendar"
                                        style={styles.icon}
                                        size={25}
                                        color="#ccc"
                                    />
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.friday ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("friday");
                                        }}
                                        value={isEnabled.friday}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="friStart"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "friStart",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.friStart && triggerValidation("friStart");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.friday &&
                                                dataZeiten.friday.start
                                                    ? dataZeiten.friday.start
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.friStart ? errors.friStart.message : " "
                                            }
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={
                                                errors.friStart && styles.inputError
                                            }
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="friEnd"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "friEnd",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.friEnd && triggerValidation("friEnd");
                                            }}
                                            onBlur={() => {
                                                isGreater("friStart", "friEnd", "friday");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.friday &&
                                                dataZeiten.friday.end
                                                    ? dataZeiten.friday.end
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.friEnd ? errors.friEnd.message : " "
                                            }
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.friEnd && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.validation}>
                                <Text style={styles.validationText}>
                                    {errors.friday ? errors.friday.message : ""}
                                </Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <View style={styles.labelWrap}>
                                    <Text style={styles.labelSpacer} />
                                    <Text style={styles.label}>Samstag</Text>
                                </View>
                                <View style={styles.lineWrap}>
                                    <AntDesign
                                        name="calendar"
                                        style={styles.icon}
                                        size={25}
                                        color="#ccc"
                                    />
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.saturday ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("saturday");
                                        }}
                                        value={isEnabled.saturday}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="satStart"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "satStart",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.satStart && triggerValidation("satStart");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.saturday &&
                                                dataZeiten.saturday.start
                                                    ? dataZeiten.saturday.start
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.satStart ? errors.satStart.message : " "
                                            }
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={
                                                errors.satStart && styles.inputError
                                            }
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="satEnd"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue(
                                                    "satEnd",
                                                    lastKey === "Backspace" ? "" : formatTime(time)
                                                );
                                                lastKey = "";
                                                errors.satEnd && triggerValidation("satEnd");
                                            }}
                                            maxLength={5}
                                            placeholder={
                                                dataZeiten &&
                                                dataZeiten.saturday &&
                                                dataZeiten.saturday.end
                                                    ? dataZeiten.saturday.end
                                                    : ""
                                            }
                                            errorMessage={
                                                errors.satEnd ? errors.satEnd.message : " "
                                            }
                                            onBlur={() => {
                                                isGreater("satStart", "satEnd", "saturday");
                                            }}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.satEnd && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.validation}>
                                <Text style={styles.validationText}>
                                    {errors.saturday ? errors.saturday.message : ""}
                                </Text>
                            </View>
                            <View style={styles.saveButtonContainer}>
                                <Button
                                    buttonStyle={styles.saveButton}
                                    titleStyle={styles.saveButtonTitle}
                                    disabled={Object.keys(errors).length !== 0}
                                    title="Speichern"
                                    onPress={handleSubmit(onSubmit)}
                                />
                            </View>
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
        paddingHorizontal: 20,
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
        flexDirection: "column",
        alignContent: "flex-start",
        justifyContent: "flex-start",
    },
    closeButtonContainer: {
        alignItems: "flex-end",
        padding: 5,
        marginTop: -25,
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
    rowContainer: {
        marginTop: 10,
        flex: 1,
    },
    labelWrap: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    labelSpacer: {
        flex: 1,
    },
    label: {
        flex: 6.5,
        color: "#555",
    },
    lineWrap: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        width: "100%",
    },
    icon: {
        flex: 1,
        paddingRight: 5,
    },
    switch: {
        transform:
            Platform.OS === "ios" ? [{scaleX: 0.8}, {scaleY: 0.8}] : [{scaleX: 1.3}, {scaleY: 1.3}],
    },
    inputWrap: {
        flex: 6,
        flexDirection: "row",
        justifyContent: "space-around",
        marginLeft: 10,
        // marginBottom: 5,
        paddingLeft: 10,
        marginBottom: -5,
    },
    input: {
        backgroundColor: "#FFF",
        paddingLeft: 20,
        flex: 5,
    },
    inputText: {
        color: "#729628",
    },
    inputError: {
        borderColor: "#ff8787",
    },
    error: {
        color: "#ff8787",
        marginLeft: -1,
    },
    validation: {
        justifyContent: "center",
        alignItems: "flex-end",
        marginTop: "-8%",
    },
    validationText: {
        color: "#ff8787",
        fontSize: 13.5,
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
