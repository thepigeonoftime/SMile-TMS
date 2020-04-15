import React, {useContext} from "react";
import {Button, Text, TextInput, TouchableOpacity} from "react-native";
import {AuthContext} from "../AuthProvider";
import {Center} from "../Center";
import AuthStyles from "../Styles/AuthStyles";
import {AuthNavProps} from "../Types";

export const Login = ({navigation}: AuthNavProps<"Login">) => {
    const {login} = useContext(AuthContext);
    return (
        <Center>
            <TextInput style={AuthStyles.authInput} placeholder="E-Mail Adresse" />
            <TextInput style={AuthStyles.authInput} placeholder="Passwort" />
            <TouchableOpacity
                style={AuthStyles.authButton}
                onPress={() => {
                    login();
                }}
            >
                <Text>Einloggen</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Register");
                }}
            >
                <Text style={{marginTop: 20, color: "#3fa9f5"}}>Ich habe keinen Login</Text>
            </TouchableOpacity>
        </Center>
    );
};
