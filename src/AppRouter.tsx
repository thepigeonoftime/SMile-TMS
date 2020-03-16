import React, { useState, useEffect, useContext } from "react";
import {
  createStackNavigator,
  StackNavigationProp
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ActivityIndicator, AsyncStorage, View } from "react-native";
import { AuthContext } from "./AuthProvider";

interface RoutesProps {}

export const AppRouter: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(userString => {
        if (userString) {
          login();
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <View>
        { /* Splash Screen */ }
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/*  {user ? <AppStack /> : <AuthStack />} */ }
    </NavigationContainer>
  );
};
