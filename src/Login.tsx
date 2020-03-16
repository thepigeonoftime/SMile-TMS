import React, { useContext } from "react";
import { AuthNavProps } from "./Types";
import { AuthContext } from "./AuthProvider";
import { Center } from "./Center";
import { Button, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import AuthStyles from "./Styles/AuthStyles";

const Login = ({ navigation }: AuthNavProps < "Login" > ) => {
    const { login } = useContext(AuthContext);
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

export default Login;
