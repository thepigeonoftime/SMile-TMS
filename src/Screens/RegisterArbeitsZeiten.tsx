import {AntDesign} from "@expo/vector-icons";
import {Formik} from "formik";
import React, {useState} from "react";
import {
    Alert,
    Keyboard,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Platform,
} from "react-native";
import {Button, Input} from "react-native-elements";
import {Switch, Text} from "react-native-paper";
import {Header} from "../Header";

export const RegisterArbeitsZeiten = ({navigation}) => {
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

    return (
        <ScrollView>
            <View>
                <Header text="Verfügbarkeit" subText="eingeben" color="#729628" />
            </View>
            <View style={styles.formContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <AntDesign name={"close"} size={20} color="#f89e3b" />
                </TouchableOpacity>
                <Formik
                    initialValues={{
                        moVon: "",
                        moBis: "",
                        diVon: "",
                        diBis: "",
                        miVon: "",
                        miBis: "",
                        doVon: "",
                        doBis: "",
                        frVon: "",
                        frBis: "",
                        saVon: "",
                        saBis: "",
                    }}
                    onSubmit={(values) => {
                        Alert.alert(JSON.stringify(values, null, 2));
                        Keyboard.dismiss();
                    }}
                >
                    {({handleChange, handleSubmit, values}) => (
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
                                    thumbColor={isEnabled.montag ? "#729628" : "#f4f3f4"}
                                    ios_backgroundColor="#e6e6e6"
                                    onValueChange={() => toggleSwitch("montag")}
                                    value={isEnabled.montag}
                                    style={styles.switch}
                                />
                                <View style={styles.inputWrap}>
                                    <Input
                                        value={values.moVon}
                                        onChangeText={handleChange("moVon")}
                                        containerStyle={styles.input}
                                        inputStyle={styles.inputText}
                                        keyboardType={"numeric"}
                                    />
                                    <Input
                                        value={values.moBis}
                                        onChangeText={handleChange("moBis")}
                                        containerStyle={styles.input}
                                        inputStyle={styles.inputText}
                                        keyboardType={"numeric"}
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
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.dienstag ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={() => toggleSwitch("dienstag")}
                                        value={isEnabled.dienstag}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Input
                                            value={values.diVon}
                                            onChangeText={handleChange("diVon")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                        />
                                        <Input
                                            value={values.diBis}
                                            onChangeText={handleChange("diBis")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
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
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.mittwoch ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={() => toggleSwitch("mittwoch")}
                                        value={isEnabled.mittwoch}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Input
                                            value={values.miVon}
                                            onChangeText={handleChange("miVon")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                        />
                                        <Input
                                            value={values.miBis}
                                            onChangeText={handleChange("miBis")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
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
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.donnerstag ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={() => toggleSwitch("donnerstag")}
                                        value={isEnabled.donnerstag}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Input
                                            value={values.doVon}
                                            onChangeText={handleChange("doVon")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                        />
                                        <Input
                                            value={values.doBis}
                                            onChangeText={handleChange("doBis")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
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
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.freitag ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={() => toggleSwitch("freitag")}
                                        value={isEnabled.freitag}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Input
                                            value={values.frVon}
                                            onChangeText={handleChange("frVon")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                        />
                                        <Input
                                            value={values.frBis}
                                            onChangeText={handleChange("frBis")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
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
                                    <Switch
                                        trackColor={{false: "#e6e6e6", true: "#e6e6e6"}}
                                        thumbColor={isEnabled.samstag ? "#729628" : "#f4f3f4"}
                                        ios_backgroundColor="#e6e6e6"
                                        onValueChange={() => toggleSwitch("samstag")}
                                        value={isEnabled.samstag}
                                        style={styles.switch}
                                    />
                                    <View style={styles.inputWrap}>
                                        <Input
                                            value={values.saVon}
                                            onChangeText={handleChange("saVon")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
                                        />
                                        <Input
                                            value={values.saBis}
                                            onChangeText={handleChange("saBis")}
                                            containerStyle={styles.input}
                                            inputStyle={styles.inputText}
                                            keyboardType={"numeric"}
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
        paddingTop: "5%",
        padding: 20,
        borderRadius: 25,
        backgroundColor: "#FFF",
        height: "100%",
        paddingBottom: "35%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
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
        zIndex: 10,
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
        alignItems: "flex-end",
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
        marginBottom: 5,
        paddingLeft: 10,
    },
    input: {
        backgroundColor: "#FFF",
        paddingLeft: 20,
        flex: 5,
    },
    inputText: {
        color: "#729628",
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
