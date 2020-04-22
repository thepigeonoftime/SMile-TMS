import React from "react";
import {QRCode} from "react-native-custom-qr-codes";
import {Center} from "../Center";

export const CodeGenerator = ({navigation}) => {
    let content = "smile QR Code test";
    return (
        <Center>
            <QRCode codeStyle="square" content={content} size={300} />
        </Center>
    );
};
