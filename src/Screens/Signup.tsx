import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import React, {useContext} from "react";
import {ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import {AuthContext} from "../AuthProvider";
import {styles} from "../Styles/AuthStyles";
import {AuthNavProps} from "../Types";

export const Signup = ({navigation, route}: AuthNavProps<"Signup">) => {
    const {signup} = useContext(AuthContext);
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ImageBackground source={require("../../assets/signupbg.png")} style={styles.image}>
                <View style={[styles.header]}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.signupHeaderText}>Jetzt</Text>
                        <Text style={styles.signupHeaderSubText}>Bei SMile registrieren</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.contentWrap}>
                <Text style={styles.inputHeader}>Anmeldung</Text>
                <View style={styles.inputWrap}>
                    <View style={styles.lineWrap}>
                        <SimpleLineIcons name="user" size={28} color="#ccc" style={{}} />
                        <Input
                            label="E-Mail Adresse"
                            placeholder="E-Mail Adresse eingeben"
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
                    <View style={[styles.lineWrap, {}]}>
                        <AntDesign name="unlock" size={28} color="#fff" style={{}} />
                        <Input
                            placeholder="Passwort wiederholen"
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
                            signup();
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
                        navigation.navigate("Login");
                    }}
                >
                    <Text style={{color: "#3fa9f5"}}>Ich habe einen Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
