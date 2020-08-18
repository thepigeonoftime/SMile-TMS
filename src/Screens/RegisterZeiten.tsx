import {AntDesign} from "@expo/vector-icons";
import moment from "moment";
import React, {useState, useContext, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import Icon from "react-native-vector-icons/Feather";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {Button, Input} from "react-native-elements";
import {Switch, Text} from "react-native-paper";
import * as yup from "yup";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";
import {wishTimeFrame, resultProps} from "../Types";
// import DropdownMenu from "react-native-dropdown-menu";
// import DropDownPicker from "react-native-dropdown-picker";
// import {Picker} from "@react-native-community/picker";
import RNPickerSelect from "react-native-picker-select";

export const RegisterZeiten = ({navigation}) => {
    const {dataZeiten, storeDataZeiten} = useContext(RegisterContext);

    const [listItems, setListItems] = useState<any>([]);
    const [entryId, setEntryId] = useState(0);
    const [formValues, setFormValues] = useState({});
    const [isComplete, setIsComplete] = useState(false);

    const timeSchema = yup.string().test("is-time", "Ungültig", (value) => {
        return value ? moment(value, "HH:mm", true).isValid() : true;
    });

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
        // submitFocusError: true,
    });

    // save last keystroke in input fields to capture backspaces
    let lastKey = "";

    const isTime = (time) => {
        return time && moment(time, "HH:mm", true).isValid();
    };

    const formatTime = (time) => {
        // automaticall add ":00" to time input to only allow full hours
        (time.length < 2 && time > 2 && (time = "0" + time + ":00")) ||
            (time.length > 1 && (time += ":00"));
        return time;
    };

    const isGreater = (start, end, errorField, pickerName) => {
        if (isTime(getValues(start)) && isTime(getValues(end))) {
            if (moment(getValues(start), "HH:mm").isSameOrAfter(moment(getValues(end), "HH:mm"))) {
                setError(errorField, "", "Startzeit muss vor Endzeit liegen");
            } else {
                clearError(errorField);
            }
        }
    };

    const getPlaceholder = (day, type) => {
        return dataZeiten && dataZeiten[day] && dataZeiten[day][type]
            ? String(dataZeiten[day][type]) + ":00"
            : "";
    };

    const onSubmit = (data) => {
        const result = [];
        weekdays.forEach((day) => {
            result[day.value] = [];
        });
        listItems.forEach((item) => {
            const day = formValues["day" + item.id] ? formValues["day" + item.id] : "monday";
            // result[day].push({
            //     startTime: formValues["start" + item.id],
            //     endTime: formValues["end" + item.id],
            // });
            result.push({
                day: day.toUpperCase(),
                startTime: formValues["start" + item.id],
                endTime: formValues["end" + item.id],
            });
        });
        // Object.entries(result).forEach(([key, value]: [string, []]) => {
        //     value && !value.length && delete result[key];
        // });
        console.log(result);
        storeDataZeiten(result, true);
        navigation.goBack();
    };

    const saveFormValues = (fieldName, value) => {
        const pickBuffer = formValues;
        pickBuffer[fieldName] = value;
        setFormValues(pickBuffer);
    };

    const weekdays = [
        {label: "Montag", value: "monday"},
        {label: "Dienstag", value: "tuesday"},
        {label: "Mittwoch", value: "wednesday"},
        {label: "Donnerstag", value: "thursday"},
        {label: "Freitag", value: "friday"},
        {label: "Samstag", value: "saturday"},
    ];

    const addItem = () => {
        setListItems([...listItems, {id: String(entryId)}]);
        setEntryId(entryId + 1);
        setIsComplete(false);
    };

    const checkComplete = () => {
        const completeCheck = [];
        listItems.forEach((item) => {
            const startTime = getValues("start" + item.id);
            const endTime = getValues("end" + item.id);
            if (startTime.length === 5 && endTime.length === 5) {
                const startValid = isTime(startTime);
                const endValid = isTime(endTime);
                if (startValid && endValid) {
                    completeCheck.push(true);
                } else {
                    !startValid && setError("start" + item.id, "", "Ungültig");
                    !endValid && setError("end" + item.id, "", "Ungültig");
                    completeCheck.push(false);
                }
            }
        });
        setIsComplete(
            completeCheck.length === listItems.length && !completeCheck.includes(false)
                ? true
                : false
        );
    };

    const TimeEntry = ({id}) => {
        const itemId = "item" + id;
        const pickerName = "day" + id;
        const startName = "start" + id;
        const endName = "end" + id;
        const errorName = "error" + id;
        return (
            <View style={styles.rowContainer} key={itemId}>
                <View style={styles.lineWrap}>
                    <AntDesign name="calendar" style={styles.icon} size={25} color="#ccc" />
                    <View style={Platform.OS === "ios" ? {flex: 2} : {flex: 3.5}}>
                        <RNPickerSelect
                            key={pickerName}
                            onValueChange={(value) => {
                                saveFormValues(pickerName, value);
                                setValue(pickerName, value);
                            }}
                            items={weekdays}
                            placeholder={
                                formValues[pickerName]
                                    ? {
                                          label: weekdays.find(
                                              (o) => o.value === formValues[pickerName]
                                          ).label,
                                          value: formValues[pickerName],
                                          style: {color: "#333", fontSize: 16},
                                      }
                                    : {}
                            }
                            style={pickerStyle}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <Controller
                            as={<Input />}
                            control={control}
                            name={startName}
                            key={startName}
                            defaultValue={getValues(startName) || ""}
                            onKeyPress={({nativeEvent}) => {
                                lastKey = nativeEvent.key;
                            }}
                            onChangeText={(time) => {
                                setValue(
                                    startName,
                                    lastKey === "Backspace" ? "" : formatTime(time)
                                );
                                saveFormValues(
                                    startName,
                                    lastKey === "Backspace" ? "" : formatTime(time)
                                );
                                lastKey = "";
                                errors[startName] && triggerValidation(startName);
                                isGreater(startName, endName, errorName, pickerName);
                                checkComplete();
                            }}
                            onBlur={() => {
                                checkComplete();
                            }}
                            maxLength={5}
                            errorMessage={errors[startName] ? errors[startName].message : " "}
                            containerStyle={styles.input}
                            inputStyle={styles.inputText}
                            keyboardType={"numeric"}
                            inputContainerStyle={errors[startName] && styles.inputError}
                            errorStyle={styles.error}
                            style={{borderWidth: 1, width: "40%"}}
                        />
                        <Controller
                            as={<Input />}
                            control={control}
                            name={endName}
                            key={endName}
                            defaultValue={getValues(endName) || ""}
                            onKeyPress={({nativeEvent}) => {
                                lastKey = nativeEvent.key;
                            }}
                            onChangeText={(time) => {
                                setValue(endName, lastKey === "Backspace" ? "" : formatTime(time));
                                saveFormValues(
                                    endName,
                                    lastKey === "Backspace" ? "" : formatTime(time)
                                );
                                lastKey = "";
                                errors[endName] && triggerValidation(endName);
                                isGreater(startName, endName, errorName, pickerName);
                                checkComplete();
                            }}
                            onBlur={() => {
                                isGreater(startName, endName, errorName, pickerName);
                                checkComplete();
                            }}
                            maxLength={5}
                            errorMessage={errors[endName] ? errors[endName].message : " "}
                            containerStyle={styles.input}
                            inputStyle={styles.inputText}
                            keyboardType={"numeric"}
                            inputContainerStyle={errors[endName] && styles.inputError}
                            errorStyle={styles.error}
                            style={{borderWidth: 1, width: "40%"}}
                        />
                    </View>
                </View>
                <View style={styles.validation}>
                    <Text style={styles.validationText}>
                        {errors[errorName] ? errors[errorName].message : ""}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Header text="Verfügbarkeit" subText="eingeben" color="#729628" />
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
                    <View style={{marginBottom: 10}}>
                        <TouchableOpacity onPress={addItem}>
                            <AntDesign name={"pluscircleo"} size={20} color="#729628" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formItems}>
                        {listItems.map((item, i) => {
                            return <TimeEntry id={item.id} key={"item" + i} />;
                        })}
                    </View>
                    <View style={styles.saveButtonContainer}>
                        <Button
                            buttonStyle={styles.saveButton}
                            titleStyle={styles.saveButtonTitle}
                            disabled={
                                Object.keys(errors).length !== 0 ||
                                !isComplete ||
                                listItems.length < 1
                            }
                            title="Speichern"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: "-22%",
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: "#FFF",
        height: "100%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 2.84,
        elevation: 5,
        marginBottom: "-11%",
    },
    formContainer: {
        flex: 1,
        minHeight: "100%",
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
    formItems: {
        // height: "50%",
        // flex: 1,
        // paddingTop: 50,
    },
    rowContainer: {
        // marginTop: 10,
        // marginBottom: 30,
        flex: 1,
        // paddingTop: 10,
        flexDirection: "column",
    },
    lineWrap: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        width: "100%",
        // height: 10,
    },
    icon: {
        flex: Platform.OS === "ios" ? 1 : 0.8,
        paddingRight: 5,
        marginTop: -25,
    },
    inputWrap: {
        flex: 6,
        flexDirection: "row",
        justifyContent: "space-around",
        marginLeft: 10,
        // marginBottom: 5,
        paddingLeft: 10,
        marginBottom: 10,
        // marginTop: 10,
    },
    input: {
        backgroundColor: "#FFF",
        paddingLeft: 10,
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
        marginTop: -1,
    },
    validation: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginTop: "-6%",
        marginRight: "3%",
    },
    validationText: {
        color: "#ff8787",
        fontSize: 13.5,
    },
    saveButtonContainer: {
        alignItems: "center",
        // marginTop: 50,
        // position: "absolute",
        // bottom: -200,
        marginTop: 50,
        // marginBottom: 50,
        // left: "25%",
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

const pickerStyle = {
    inputIOS: {
        // marginTop: -25,
        paddingBottom: 30,
        color: "#555",
        fontSize: 16,
        padding: 0,
    },
    inputAndroid: {
        marginTop: -30,
        color: "#555",
        fontSize: 16,
        margin: 0,
        width: 120,
    },
    placeholder: {
        color: "#555",
        fontSize: 16,
    },
    icon: {
        position: "absolute",
        backgroundColor: "transparent",
        borderTopWidth: 5,
        borderTopColor: "#00000099",
        borderRightWidth: 5,
        borderRightColor: "transparent",
        borderLeftWidth: 5,
        borderLeftColor: "transparent",
        width: 0,
    },
    iconContainer: {
        placeholderColor: "#ababa",
        padding: 0,
        width: 0,
    },
};
