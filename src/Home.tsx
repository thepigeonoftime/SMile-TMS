import React, { useContext, useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Center } from "./Center";
import { Text, TouchableOpacity, FlatList, Button } from "react-native";
import { AuthContext } from "./AuthProvider";
import { HomeProps } from "./Types";

const Stack = createStackNavigator<HomeProps>();

const HomeView = ({ navigation }) => {
  return (
    <Center>
    <Text> Home </Text>
    </Center>
  );
};

export const Home: React.FC<{}> = ({}) => {
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
