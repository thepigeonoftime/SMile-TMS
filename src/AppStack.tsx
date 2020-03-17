import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tabs = createBottomTabNavigator();

export const AppStack: React.FC<{}> = ({}) => {
  return (
    <Tabs.Navigator>
    </Tabs.Navigator>
  );
};
