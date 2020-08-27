import {AntDesign} from "@expo/vector-icons";
import moment from "moment";
import React, {useContext, useState} from "react";
import {Platform, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Text} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import * as yup from "yup";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";
import {useForm} from "react-hook-form";

export const RegisterZeiten = ({navigation}) => {
    const {storeDataZeiten} = useContext(RegisterContext);

    const [listItems, setListItems] = useState<any>([]);
    const [entryId, setEntryId] = useState(0);
    const [formValues, setFormValues] = useState({});
    const [activeId, setActiveId] = useState(null);
    const [activeTime, setActiveTime] = useState("");
    const [showTimeSelect, setShowTimeSelect] = useState(false);
    const [timeErrors, setTimeErrors] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    const {errors, setError, clearError} = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        // submitFocusError: true,
    });

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

    const setTime = (fieldName, time) => {
        const timeBuffer = formValues;
        timeBuffer[fieldName] = time;
        setFormValues(timeBuffer);
    };

    const isTime = (time) => {
        return time && moment(time, "HH:mm", true).isValid();
    };

    const isGreater = (id) => {
        if (
            moment(formValues["start" + id], "HH:mm").isSameOrAfter(
                moment(formValues["end" + id], "HH:mm")
            )
        ) {
            setError("error" + id, "", "Startzeit muss vor Endzeit liegen");
        } else {
            clearError("error" + id);
        }
    };

    const saveFormValues = (fieldName, value) => {
        const pickBuffer = formValues;
        pickBuffer[fieldName] = value;
        setFormValues(pickBuffer);
    };

    const checkComplete = () => {
        const completeCheck = [];
        let errorCheck = true;
        listItems.forEach((item) => {
            const startValid = isTime(formValues["start" + item.id]);
            const endValid = isTime(formValues["end" + item.id]);
            completeCheck.push(startValid && endValid ? true : false);
        });
        timeErrors.forEach((item) => {
            item && (errorCheck = false);
        });
        console.log(completeCheck, errorCheck);
        setIsComplete(
            completeCheck.length === listItems.length &&
                !completeCheck.includes(false) &&
                errorCheck
                ? true
                : false
        );
    };

    const onSubmit = (data) => {
        const result = [];
        weekdays.forEach((day) => {
            result[day.value] = [];
        });
        listItems.forEach((item) => {
            const day = formValues["day" + item.id] ? formValues["day" + item.id] : "monday";
            result.push({
                day: day.toUpperCase(),
                startTime: formValues["start" + item.id],
                endTime: formValues["end" + item.id],
            });
        });
        console.log(result);
        storeDataZeiten(result, true);
        navigation.goBack();
    };

    const TimeEntry = ({id}) => {
        const itemId = "item" + id;
        const pickerName = "day" + id;
        const startName = "start" + id;
        const endName = "end" + id;
        const errorName = "error" + id;
        const date = new Date();
        return (
            <View style={styles.rowContainer} key={itemId}>
                <View style={styles.lineWrap}>
                    <AntDesign name="calendar" style={styles.icon} size={25} color="#ccc" />
                    <View style={Platform.OS === "ios" ? {flex: 2} : {flex: 3.5}}>
                        <RNPickerSelect
                            key={pickerName}
                            onValueChange={(value) => {
                                saveFormValues(pickerName, value);
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
                        <TouchableOpacity
                            onPress={() => {
                                setActiveId(id);
                                setActiveTime(startName);
                                setShowTimeSelect(!showTimeSelect);
                            }}
                            style={{paddingLeft: "25%", paddingRight: "20%"}}
                        >
                            <Text style={styles.pickerText}>
                                {formValues[startName]
                                    ? moment(formValues[startName]).format("HH:mm")
                                    : "--:--"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setActiveId(id);
                                setActiveTime(endName);
                                setShowTimeSelect(!showTimeSelect);
                            }}
                        >
                            <Text style={styles.pickerText}>
                                {formValues[endName]
                                    ? moment(formValues[endName]).format("HH:mm")
                                    : "--:--"}
                            </Text>
                        </TouchableOpacity>
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
                    <View>
                        <DateTimePickerModal
                            isVisible={showTimeSelect}
                            mode="time"
                            locale="de_DE"
                            onConfirm={(time) => {
                                setTime(activeTime, time);
                                setShowTimeSelect(!showTimeSelect);
                                isGreater(activeId);
                                checkComplete();
                            }}
                            onCancel={() => {
                                setShowTimeSelect(!showTimeSelect);
                            }}
                        />
                    </View>
                    <View style={styles.saveButtonContainer}>
                        <Button
                            buttonStyle={styles.saveButton}
                            titleStyle={styles.saveButtonTitle}
                            disabled={Object.keys(errors).length !== 0 || !isComplete}
                            title="Speichern"
                            onPress={onSubmit}
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
        marginTop: Platform.OS === "ios" ? "-20%" : "-23%",
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
        paddingTop: 20,
    },
    rowContainer: {
        flex: 1,
        flexDirection: "column",
        marginVertical: Platform.OS === "ios" ? -5 : 10,
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
        justifyContent: "flex-start",
        // justifyContent: "center",
        // marginRight: "-20%",
        // marginBottom: 5,
        // paddingLeft: 100,
        marginBottom: 10,
        marginTop: -14,
    },
    pickerText: {
        color: "#555",
        fontSize: 16,
        // width: 90,
    },
    validation: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginTop: "-2%",
        marginBottom: "2%",
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
