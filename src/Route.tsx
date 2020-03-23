import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Center } from "./Center";
import { RouteProps } from "./Types";

const getRoute = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("loading");

  const fetchRoute = async (url: string) => {
    const response = await fetch(url);
    response
      .json()
      .then(res => setData(res))
      .catch(err => setError(err));
  };

  useEffect(() => {
    fetchRoute(url);
  }, []);
  return { data, loading };
};

const RouteView = ({ navigation }) => {
  const { data, loading } = getRoute("https://bpt-lab.org/smile/sphinx/getTours");
  return (
    <Center>
      <Text>{loading}</Text>
      <Text> {JSON.stringify(data, null, 2)} </Text>
    </Center>
  );
};

const Stack = createStackNavigator<RouteProps>();

export const Route: React.FC<{}> = ({ }) => {
  return (
    <Stack.Navigator initialRouteName="Route">
      <Stack.Screen options={{ title: "Route" }} name="Route" component={RouteView} />
    </Stack.Navigator>
  );
};
