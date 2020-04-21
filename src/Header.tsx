import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useFonts} from "@use-expo/font";

interface HeaderProps {
    text: string;
    subText?: string;
    color?: string;
    containerStyle?: {};
    textStyle?: {};
    subTextStyle?: {};
    bgColor?: string;
}

export const Header: React.SFC<HeaderProps> = (props) => {
    let [fontsLoaded] = useFonts({
        KonnectBlack: require("../assets/fonts/Konnect-Black.otf"),
    });
    const color = (propcolor) => {
        return propcolor ? {color: propcolor} : {color: "#729628"};
    };
    const bgColor = (propbgColor) => {
        return propbgColor ? {backgroundColor: propbgColor} : {backgroundColor: "#F2F2F2"};
    };

    if (!fontsLoaded) {
        return (
            <View>
                <Text>loading</Text>
            </View>
        );
    } else {
        return (
            <View
                style={[
                    [props.containerStyle ? props.containerStyle : styles.containerDefault],
                    [bgColor(props.bgColor)],
                ]}
            >
                <View style={styles.spacer} />
                <View style={styles.textWrapper}>
                    <Text
                        style={[
                            color(props.color),
                            {fontFamily: "KonnectBlack"},
                            [props.textStyle ? props.textStyle : styles.textDefault],
                        ]}
                    >
                        {props.text}
                    </Text>
                    <Text
                        style={[
                            color(props.color),
                            [props.subTextStyle ? props.subTextStyle : styles.subTextDefault],
                        ]}
                    >
                        {props.subText}
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    containerDefault: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingTop: "15%",
        height: 240,
    },
    spacer: {
        flex: 2,
    },
    textWrapper: {
        flex: 10,
    },
    textDefault: {
        fontSize: 36,
        lineHeight: 40,
        fontWeight: "900",
    },
    subTextDefault: {
        fontSize: 20,
    },
});
