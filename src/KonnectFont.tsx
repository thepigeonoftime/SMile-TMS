import React, {useState, useEffect} from "react";
import * as Font from "expo-font";
import {Text} from "react-native";

export const KonnectFont = (props) => {
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    let customFonts = {
        KonnectBlack: require("../assets/fonts/Konnect-Black.otf"),
    };

    const loadFontsAsync = async () => {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
    };

    useEffect(() => {
        loadFontsAsync();
    });
    return (
        <Text style={[fontsLoaded && {fontFamily: "KonnectBlack"}, props.style]}>
            {props.children}
        </Text>
    );
};
