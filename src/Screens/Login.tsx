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
            <Button
                title="Ich habe noch kein Login"
                onPress={() => {
                    navigation.navigate("Register");
                }}
            />
        </Center>
    );
};
