import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppProps } from "./Types";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import { Home } from "./Home";
import { Routen } from "./Routen";
import { Settings } from "./Settings";

const Tabs = createBottomTabNavigator<AppProps>();

export const AppStack: React.FC<{}> = ({}) => {
  return (
    <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home";
          return <AntDesign name={"home"} size={size} color={color} />;
        } else if (route.name === "Routen") {
          return <EvilIcons name={"search"} size={size} color={color} />;
        } else if (route.name === "Settings") {
          return <EvilIcons name={"gear"} size={size} color={color} />;
        }
        // default fallback
        return <AntDesign name={"home"} size={size} color={color} />;
      }
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }}
    >
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Routen" component={Routen} />
    <Tabs.Screen options={{title: "Einstellungen"}} name="Settings" component={Settings} />
    </Tabs.Navigator>
    );
};
