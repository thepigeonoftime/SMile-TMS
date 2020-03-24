import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Center } from "./Center";
import { Text, TouchableOpacity, FlatList, Button } from "react-native";
import { AuthContext } from "./AuthProvider";
import { HomeProps } from "./Types";
import { RegisterContext } from "./RegisterProvider";

const Stack = createStackNavigator<HomeProps>();

const HomeView = ({ navigation }) => {
  const { unregister } = useContext(RegisterContext);
  return (
    <Center>
      <TouchableOpacity
        onPress={() => {
          unregister();
        }}>
        <Text>unregister</Text>
                </TouchableOpacity>
    </Center>
  );
};

export const Home: React.FC<{}> = ({ }) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            );
          }
        }}
        component={HomeView}
      />
    </Stack.Navigator>
  );
};
