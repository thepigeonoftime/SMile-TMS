import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppProps } from "./Types";
import { Home } from "./Home";
import { Routen } from "./Routen";
import { Settings } from "./Settings";

const Tabs = createBottomTabNavigator<AppProps>();

export const AppStack: React.FC<{}> = ({}) => {
  return (
    <Tabs.Navigator>
   <Tabs.Screen name="Home" component={Home} />
   <Tabs.Screen name="Routen" component={Routen} />
   <Tabs.Screen options={{title: "Einstellungen"}} name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};
