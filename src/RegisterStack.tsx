import React, { useContext } from "react"
import { Text, View } from "react-native"
import { RegisterContext } from "./RegisterProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Center } from "./Center";

export const RegisterStack = () => {
    const { registered, register } = useContext(RegisterContext);
    return (
            <Center>
            <Text>Please Register</Text>
            <TouchableOpacity onPress={() => { register(); }}>
                    <Text style={{fontWeight: "bold", marginTop: 20}}>Register</Text>
                </TouchableOpacity>
            </Center>
    )
}