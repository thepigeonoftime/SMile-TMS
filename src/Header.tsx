import React from "react";
import {View, Text, StyleSheet} from "react-native";

interface HeaderProps {
    text: string;
    subText?: string;
    color?: string;
    containerStyle?: {};
    textStyle?: {};
    subTextStyle?: {};
}

export const Header: React.SFC<HeaderProps> = props => {
    const color = propcolor => {
        if (propcolor) {
            return {
                color: propcolor
            };
        } else {
            return {
                color: "#729628"
            };
        }
    };
    return (
        <View style={[props.containerStyle ? props.containerStyle : styles.containerDefault]}>
            <Text
                style={[
                    color(props.color),
                    [props.textStyle ? props.textStyle : styles.textDefault]
                ]}
            >
                {props.text}
            </Text>
            <Text
                style={[
                    color(props.color),
                    [props.subTextStyle ? props.subTextStyle : styles.subTextDefault]
                ]}
            >
                {props.subText}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    containerDefault: {
        paddingLeft: 60,
        paddingTop: "20%",
        alignItems: "flex-start",
        paddingBottom: 40,
        backgroundColor: "#F2F2F2"
    },
    textDefault: {
        fontSize: 40,
        fontWeight: "800"
    },
    subTextDefault: {
        fontSize: 20
    }
});
