import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Login from "./Login";
import Register from "./Register";

const Stack = createStackNavigator();

export const AuthStack: React.FC < {} > = ({}) => {
    return (
        <Stack.Navigator
      // screenOptions={{
      //   header: () => null
      // }}
      initialRouteName="Login"
    >
      <Stack.Screen
        options={{
          headerTitle: "Login"
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: "Registrieren"
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
    );
};
