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
            <View style={styles.spacer} />
            <View style={styles.textWrapper}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    containerDefault: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingTop: "15%",
        backgroundColor: "#F2F2F2",
        height: 190
    },
    spacer: {
        flex: 2
    },
    textWrapper: {
        flex: 10
    },
    textDefault: {
        fontSize: 36,
        fontWeight: "800"
    },
    subTextDefault: {
        fontSize: 20
    }
});
