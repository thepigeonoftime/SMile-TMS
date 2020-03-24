import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage, View } from "react-native";
import { AppRouter } from "./AppRouter";
import { AuthContext } from "./AuthProvider";
import { AuthStack } from "./AuthStack";
import { RegisterProvider } from "./RegisterProvider";

export const AuthRouter: React.FC<{}> = ({}) => {
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
      {user ? <RegisterProvider><AppRouter /></RegisterProvider> : <AuthStack />}
    </NavigationContainer>
  );
};
