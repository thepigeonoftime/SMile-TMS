import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppProps } from "./Types";
import { Home } from "./Home";

const Tabs = createBottomTabNavigator<AppProps>();

export const AppStack: React.FC<{}> = ({}) => {
  return (
    <Tabs.Navigator>
   <Tabs.Screen name="Home" component={Home} />
    </Tabs.Navigator>
  );
};
