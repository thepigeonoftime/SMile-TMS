import {AntDesign} from "@expo/vector-icons";
import moment from "moment";
import React, {useState, useContext} from "react";
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
import * as Yup from "yup";
import {Header} from "../Header";
import {RegisterContext} from "../RegisterProvider";

export const RegisterZeiten = ({navigation}) => {
    const {storeDataZeiten} = useContext(RegisterContext);

    const timeSchema = Yup.string().test("is-time", "Keine gültige Zeit", function (value) {
        if (value) {
            return moment(value, "HH:mm", true).isValid();
        } else {
            return true;
        }
    });

    const validationSchema = Yup.object().shape({
        moVon: timeSchema,
        moBis: timeSchema,
        diVon: timeSchema,
        diBis: timeSchema,
        miVon: timeSchema,
        miBis: timeSchema,
        doVon: timeSchema,
        doBis: timeSchema,
        frVon: timeSchema,
        frBis: timeSchema,
        saVon: timeSchema,
        saBis: timeSchema,
    });

    const [isEnabled, setIsEnabled] = useState({
        montag: false,
        dienstag: false,
        mittwoch: false,
        donnerstag: false,
        freitag: false,
        samstag: false,
    });

    const toggleSwitch = (key) => {
        setIsEnabled({...isEnabled, [key]: !isEnabled[key]});
    };

    const formatTime = (time) => {
        time.length > 2 &&
            !time.includes(":") &&
            lastKey !== "Backspace" &&
            (time = time.slice(0, 2) + ":" + time.slice(2));
        return time;
    };

    let lastKey = "";

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
        validationSchema: validationSchema,
        submitFocusError: true,
    });

    const onSubmit = (data) => {
        data = Object.keys(data).filter(function (key) {
            return data[key];
        });
        console.log(data);
        storeDataZeiten(data);
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
                                <Controller
                                    as={<Switch />}
                                    control={control}
                                    name="MONDAY"
                                    trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                    thumbColor={isEnabled.montag ? "#729628" : "#f4f3f4"}
                                    ios_backgroundColor="#e6e6e6"
                                    onValueChange={(value) => {
                                        toggleSwitch("montag");
                                        setValue("MONDAY", value);
                                    }}
                                    value={isEnabled.montag}
                                    style={styles.switch}
                                />
                                <View style={styles.inputWrap}>
                                    <Controller
                                        as={<Input />}
                                        control={control}
                                        name="moVon"
                                        lastkey="none"
                                        onKeyPress={({nativeEvent}) => {
                                            lastKey = nativeEvent.key;
                                        }}
                                        onChangeText={(time) => {
                                            setValue("moVon", formatTime(time));
                                            errors.moVon && triggerValidation("moVon");
                                        }}
                                        maxLength={5}
                                        errorMessage={errors.moVon ? errors.moVon.message : " "}
                                        containerStyle={styles.input}
                                        inputStyle={styles.inputText}
                                        keyboardType={"numeric"}
                                        inputContainerStyle={errors.moVon && styles.inputError}
                                        errorStyle={styles.error}
                                    />
                                    <Controller
                                        as={<Input />}
                                        control={control}
                                        name="moBis"
                                        lastkey="none"
                                        onKeyPress={({nativeEvent}) => {
                                            lastKey = nativeEvent.key;
                                        }}
                                        onChangeText={(time) => {
                                            setValue("moBis", formatTime(time));
                                            errors.moBis && triggerValidation("moBis");
                                        }}
                                        maxLength={5}
                                        errorMessage={errors.moBis ? errors.moBis.message : " "}
                                        containerStyle={styles.input}
                                        inputStyle={styles.inputText}
                                        keyboardType={"numeric"}
                                        inputContainerStyle={errors.moBis && styles.inputError}
                                        errorStyle={styles.error}
                                    />
                                </View>
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
                                    <Controller
                                        as={<Switch />}
                                        control={control}
                                        name="TUESDAY"
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.dienstag ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("dienstag");
                                            setValue("TUESDAY", value);
                                        }}
                                        value={isEnabled.dienstag}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="diVon"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("diVon", formatTime(time));
                                                errors.diVon && triggerValidation("diVon");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.diVon ? errors.diVon.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.diVon && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="diBis"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("diBis", formatTime(time));
                                                errors.diBis && triggerValidation("diBis");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.diBis ? errors.diBis.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.diBis && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
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
                                    <Controller
                                        as={<Switch />}
                                        control={control}
                                        name="WEDNESDAY"
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.mittwoch ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("mittwoch");
                                            setValue("WEDNESDAY", value);
                                        }}
                                        value={isEnabled.mittwoch}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="miVon"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("miVon", formatTime(time));
                                                errors.miVon && triggerValidation("miVon");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.miVon ? errors.miVon.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.miVon && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="miBis"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("miBis", formatTime(time));
                                                errors.miBis && triggerValidation("miBis");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.miBis ? errors.miBis.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.miBis && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
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
                                    <Controller
                                        as={<Switch />}
                                        control={control}
                                        name="THURSDAY"
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.donnerstag ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("donnerstag");
                                            setValue("TUESDAY", value);
                                        }}
                                        value={isEnabled.donnerstag}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="doVon"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("doVon", formatTime(time));
                                                errors.doVon && triggerValidation("doVon");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.doVon ? errors.doVon.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.doVon && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="doBis"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("doBis", formatTime(time));
                                                errors.doBis && triggerValidation("doBis");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.doBis ? errors.doBis.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.doBis && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
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
                                    <Controller
                                        as={<Switch />}
                                        control={control}
                                        name="FRIDAY"
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.freitag ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("freitag");
                                            setValue("TUESDAY", value);
                                        }}
                                        value={isEnabled.freitag}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="frVon"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("frVon", formatTime(time));
                                                errors.frVon && triggerValidation("frVon");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.frVon ? errors.frVon.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.frVon && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="frBis"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("frBis", formatTime(time));
                                                errors.frBis && triggerValidation("frBis");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.frBis ? errors.frBis.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.frBis && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
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
                                    <Controller
                                        as={<Switch />}
                                        control={control}
                                        name="SATURDAY"
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.samstag ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={(value) => {
                                            toggleSwitch("samstag");
                                            setValue("SATURDAY", value);
                                        }}
                                        value={isEnabled.samstag}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="saVon"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("saVon", formatTime(time));
                                                errors.saVon && triggerValidation("saVon");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.saVon ? errors.saVon.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.saVon && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                        <Controller
                                            as={<Input />}
                                            control={control}
                                            name="saBis"
                                            lastkey="none"
                                            onKeyPress={({nativeEvent}) => {
                                                lastKey = nativeEvent.key;
                                            }}
                                            onChangeText={(time) => {
                                                setValue("saBis", formatTime(time));
                                                errors.saBis && triggerValidation("saBis");
                                            }}
                                            maxLength={5}
                                            errorMessage={errors.saBis ? errors.saBis.message : " "}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                            inputContainerStyle={errors.saBis && styles.inputError}
                                            errorStyle={styles.error}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.saveButtonContainer}>
                                <Button
                                    buttonStyle={styles.saveButton}
                                    titleStyle={styles.saveButtonTitle}
                                    disabled={false}
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
