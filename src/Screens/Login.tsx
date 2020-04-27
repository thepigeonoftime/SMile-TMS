import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import React, {useContext} from "react";
import {ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import {AuthContext} from "../AuthProvider";
import {styles} from "../Styles/AuthStyles";
import {AuthNavProps} from "../Types";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export const Login = ({navigation, route}: AuthNavProps<"Signup">) => {
    const {login} = useContext(AuthContext);
    return (
        <KeyboardAwareScrollView
            style={{backgroundColor: "#FFF"}}
            resetScrollToCoords={{x: 0, y: 0}}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            enableOnAndroid={true}
        >
            <ImageBackground source={require("../../assets/signupbg.png")} style={styles.image}>
                <View style={[styles.header]}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.loginHeaderText}>Herzlich Willkommen bei SMile</Text>
                        <Text style={styles.loginHeaderSubText}>
                            Anmelden, Touren übernehmen, Pakete ausliefern.
                        </Text>
                        <Text style={[styles.loginHeaderSubText, {fontWeight: "bold"}]}>
                            Ganz einfach.
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.contentWrap}>
                <Text style={styles.inputHeader}>Anmeldung</Text>
                <View style={styles.inputWrap}>
                    <View style={styles.lineWrap}>
                        <SimpleLineIcons name="user" size={28} color="#ccc" style={{}} />
                        <Input
                            label="Username"
                            placeholder="Username"
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{borderBottomColor: "#aaa"}}
                            labelStyle={styles.input}
                            inputStyle={styles.input}
                        />
                    </View>
                    <View style={[styles.lineWrap, {marginTop: 20}]}>
                        <AntDesign name="unlock" size={28} color="#ccc" style={{}} />
                        <Input
                            label="Passwort"
                            placeholder="Passwort eingeben"
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{borderBottomColor: "#aaa"}}
                            labelStyle={styles.input}
                            inputStyle={styles.input}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={[styles.buttonWrap]}>
                    <Button
                        title={"Weiter"}
                        onPress={() => {
                            login();
                        }}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonTitle}
                    />
                </View>
            </View>
            <View
                style={{
                    alignItems: "center",
                    paddingBottom: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Signup");
                    }}
                >
                    <Text style={{color: "#3fa9f5"}}>Ich habe keinen Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};
