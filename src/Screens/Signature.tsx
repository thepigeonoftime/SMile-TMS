import React, {useState, useRef} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {SignatureProps} from "../Types";
import {Button, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import ExpoPixi from "expo-pixi";

const Stack = createStackNavigator<SignatureProps>();

const SignView = ({navigation}) => {
    let ref = useRef(0);
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.sketchContainer}>
                    <ExpoPixi.Signature
                        ref={(ref) => (this.sketch = ref)}
                        style={styles.sketch}
                        strokeColor={"blue"}
                        strokeAlpha={1}
                        onReady={this.onReady}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    this.sketch.undo();
                }}
            >
                <Text>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sketch: {
        flex: 1,
    },
    sketchContainer: {
        height: "100%",
    },
    image: {
        flex: 1,
    },
    label: {
        width: "100%",
        padding: 5,
        alignItems: "center",
    },
    button: {
        zIndex: 1,
        padding: 12,
        minWidth: 56,
        minHeight: 48,
    },
});

export const Signature: React.FC<{}> = ({}) => {
    return (
        <Stack.Navigator initialRouteName="Signature">
            <Stack.Screen options={{title: "Unterschrift"}} name="Signature" component={SignView} />
        </Stack.Navigator>
    );
};
