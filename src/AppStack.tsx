import {AntDesign, EvilIcons, Ionicons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {Home} from "./Home";
import {Maps} from "./Maps";
import {QRTest} from "./QRTest";
import {Settings} from "./Settings";
import {Signature} from "./Signature";
import {Tour} from "./Tour";
import {AppProps} from "./Types";

const Tabs = createBottomTabNavigator<AppProps>();

export const AppStack: React.FC<{}> = ({}) => {
    return (
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    if (route.name === "Home") {
                        return <AntDesign name={"home"} size={size} color={color} />;
                    } else if (route.name === "Tour") {
                        return <EvilIcons name={"search"} size={size} color={color} />;
                    } else if (route.name === "Maps") {
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
                }
            })}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray"
            }}>
            <Tabs.Screen name="Home" component={Home} />
            <Tabs.Screen name="Tour" component={Tour} />
            <Tabs.Screen options={{title: "Karte"}} name="Maps" component={Maps} />
            <Tabs.Screen options={{title: "QR Codes"}} name="QRTest" component={QRTest} />
            <Tabs.Screen name="Signature" component={Signature} />
            <Tabs.Screen options={{title: "Einstellungen"}} name="Settings" component={Settings} />
        </Tabs.Navigator>
    );
};
