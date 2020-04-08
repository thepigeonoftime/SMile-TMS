import {AntDesign, EvilIcons, Ionicons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {useContext} from "react";
import {Maps} from "./Screens/Maps";
import {QRTest} from "./Screens/QRTest";
import {RegisterContext} from "./RegisterProvider";
import {Settings} from "./Screens/Settings";
import {Signature} from "./Screens/Signature";
import {AppProps} from "./Types";

const Tabs = createBottomTabNavigator<AppProps>();

export const TestStack: React.FC<{}> = ({}) => {
    const {registered, unregister} = useContext(RegisterContext);
    return (
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    if (route.name === "Maps") {
                        return <Ionicons name={"md-map"} size={size} color={color} />;
                    } else if (route.name === "Settings") {
                        return <EvilIcons name={"gear"} size={size} color={color} />;
                    } else if (route.name === "QRTest") {
                        return <AntDesign name={"scan1"} size={size} color={color} />;
                    } else if (route.name === "Signature") {
                        return <AntDesign name={"edit"} size={size} color={color} />;
                    }
                    // default fallback
                    return <AntDesign name={"home"} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
                tabStyle: {
                    bottom: "25%",
                    left: "5%",
                    width: "90%",
                    height: 70,
                    padding: 0,
                    margin: 0,
                    borderTopColor: "transparent",
                    backgroundColor: "#FFF",
                    paddingTop: 15,
                    paddingBottom: 15,
                },
            }}
        >
            <Tabs.Screen options={{title: "Karte"}} name="Maps" component={Maps} />
            <Tabs.Screen options={{title: "QR Codes"}} name="QRTest" component={QRTest} />
            <Tabs.Screen name="Signature" component={Signature} />
            <Tabs.Screen options={{title: "Einstellungen"}} name="Settings" component={Settings} />
        </Tabs.Navigator>
    );
};
