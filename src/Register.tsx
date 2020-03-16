import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Center } from "./Center";
import { Button, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import AuthStyles from "./Styles/AuthStyles";

const Register = ({ navigation, route }) => {
  const { signup } = useContext(AuthContext);
    return (
        <Center>
      <TextInput style={AuthStyles.authInput} placeholder="E-Mail Adresse" />
      <TextInput style={AuthStyles.authInput} placeholder="Passwort" />
      <TouchableOpacity
        style={AuthStyles.authButton}
        onPress={() => {
          signup();
        }}
      >
      <Text>Registrieren</Text>
      </TouchableOpacity>
      <Button
        title="Ich habe bereits einen Login"
        onPress={() => {
          navigation.navigate("Login");
          // navigation.goBack()
        }}
      />
    </Center>
    );
};

export default Register;
