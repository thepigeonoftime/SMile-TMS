import {StyleSheet} from "react-native";
import {useFonts} from "@use-expo/font";
/* tslint:disable:no-unused-styles */

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#FFF",
        minHeight: "100%",
    },
    header: {
        paddingHorizontal: "15%",
        paddingTop: "15%",
        paddingBottom: "30%",
    },
    loginHeaderText: {
        fontWeight: "bold",
        color: "#FFF",
        fontSize: 18,
    },
    loginHeaderSubText: {
        color: "#FFF",
        fontSize: 16,
        paddingTop: 5,
    },
    signupHeaderText: {
        fontWeight: "bold",
        color: "#FFF",
        fontSize: 40,
    },
    signupHeaderSubText: {
        color: "#FFF",
        fontSize: 16,
        marginBottom: 20,
    },
    textWrapper: {},
    image: {},
    contentWrap: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "#fff",
        top: "-13%",
        paddingHorizontal: "10%",
    },
    inputHeader: {
        fontSize: 21,
        color: "#696d7d",
        fontWeight: "bold",
        paddingTop: "10%",
    },
    inputWrap: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: "10%",
        paddingRight: "5%",
        paddingLeft: "5%",
    },
    lineWrap: {
        flex: 1,
        paddingTop: "1%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    inputContainer: {},
    input: {
        fontSize: 14,
    },
    buttonContainer: {
        flex: 10,
        alignItems: "center",
        top: "-5%",
    },
    buttonWrap: {
        width: "75%",
    },
    button: {
        borderRadius: 40,
        height: 40,
        marginHorizontal: "5%",
    },
    buttonTitle: {
        fontWeight: "bold",
        fontSize: 20,
    },
});
