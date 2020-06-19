import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import React, {useContext, useState} from "react";
import {ImageBackground, KeyboardAvoidingView, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import {AuthContext} from "../AuthProvider";
import {styles} from "../Styles/AuthStyles";
import {AuthNavProps} from "../Types";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export const Signup = ({navigation, route}: AuthNavProps<"Signup">) => {
    const {signup, signupMsg} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [complete, setComplete] = useState(false);

    const checkInput = (confirmation) => {
        console.log(confirmation, password);
        if (user && confirmation === password) {
            setComplete(true);
        } else {
            setComplete(false);
        }
    };

    const onSubmit = () => {
        signup(user.trim(), password);
    };

    return (
        <KeyboardAwareScrollView
            style={{backgroundColor: "#FFF"}}
            resetScrollToCoords={{x: 0, y: 0}}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            enableOnAndroid={true}
            // extraHeight={60}
            extraScrollHeight={60}
        >
            <ImageBackground
                source={require("../../assets/signupbg.png")}
                style={styles.headerImage}
            >
                <View style={styles.header}>
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
                            onChangeText={(value) => setUser(value)}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{borderBottomColor: "#aaa"}}
                            labelStyle={styles.input}
                            inputStyle={styles.input}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={[styles.lineWrap, {paddingTop: "8%"}]}>
                        <AntDesign name="unlock" size={28} color="#ccc" style={{}} />
                        <Input
                            label="Passwort"
                            placeholder="Passwort eingeben"
                            onChangeText={(value) => setPassword(value)}
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
                            onChangeText={(value) => checkInput(value)}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{borderBottomColor: "#aaa"}}
                            labelStyle={styles.input}
                            inputStyle={styles.input}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.signupMsgContainer}>
                <Text style={styles.signupMsg}>{signupMsg}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={[styles.buttonWrap]}>
                    <Button
                        title={"Weiter"}
                        onPress={onSubmit}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonTitle}
                        disabled={!complete}
                    />
                </View>
            </View>
            <View style={styles.switchLink}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                >
                    <Text style={{color: "#3fa9f5"}}>Ich habe einen Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};
