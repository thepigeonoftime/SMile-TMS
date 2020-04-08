import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {Login} from "./Screens/Login";
import {Signup} from "./Screens/Signup";
import {AuthProps} from "./Types";

const Stack = createStackNavigator<AuthProps>();

export const AuthStack: React.FC<{}> = ({}) => {
    return (
        <Stack.Navigator
            // screenOptions={{
            //   header: () => null
            // }}
            initialRouteName="Login"
        >
            <Stack.Screen
                options={{
                    headerTitle: "Login",
                }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Registrieren",
                }}
                name="Register"
                component={Signup}
            />
        </Stack.Navigator>
    );
};
