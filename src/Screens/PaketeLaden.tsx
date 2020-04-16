import React from "react";
import {QRCode} from "react-native-custom-qr-codes-expo";
import {Center} from "../Center";
import {GeneratorProps} from "../Types";

export const PaketeLaden = ({navigation}) => {
    let content = "smile QR Code test";
    return (
        <Center>
            <QRCode codeStyle="square" content={content} size={300} />
        </Center>
    );
};
