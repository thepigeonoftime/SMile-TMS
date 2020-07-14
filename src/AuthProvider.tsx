import * as SecureStore from "expo-secure-store";
import React, {useState} from "react";
import {postLogin, postSignup} from "./Requests";
import {AsyncStorage} from "react-native";
import moment from "moment";

type Token = null | string;

export const AuthContext = React.createContext<{
    token: Token;
    loginMsg: string;
    signupMsg: string;
    disableButton: boolean;
    signup: (user, password) => void;
    login: (user, password) => void;
    storeToken: (token) => void;
    removeToken: () => void;
    logout: () => void;
}>({
    token: null,
    loginMsg: null,
    signupMsg: null,
    disableButton: false,
    signup: () => true,
    login: () => true,
    storeToken: () => true,
    removeToken: () => true,
    logout: () => true,
});

export const AuthProvider: React.FC<{}> = ({children}) => {
    const [token, setToken] = useState<Token>(null);
    const [loginMsg, setLoginMsg] = useState<string>(null);
    const [signupMsg, setSignupMsg] = useState<string>(null);
    const [disableButton, setDisableButton] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                token,
                loginMsg,
                signupMsg,
                disableButton,
                signup: (user, password) => {
                    setDisableButton(true);
                    postSignup(user, password)
                        .then((response) => {
                            setSignupMsg(
                                "Registrierung erfolgreich\nBitte bestätigen Sie Ihre E-Mail Adresse"
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                            setSignupMsg("Registrierung fehlgeschlagen");
                            setDisableButton(false);
                            setTimeout(() => {
                                setSignupMsg(null);
                            }, 5000);
                        });
                },
                login: (user, password) => {
                    setDisableButton(true);
                    postLogin(user, password)
                        .then((response) => {
                            SecureStore.setItemAsync("token", response.data.token);
                            SecureStore.setItemAsync(
                                "tokenExpiry",
                                moment().add(1, "year").subtract(1, "hour").format()
                            );
                            setToken(response.data.token);
                        })
                        .catch((err) => {
                            console.log(err);
                            setLoginMsg("Login fehlgeschlagen");
                            setDisableButton(false);
                            setTimeout(() => {
                                setLoginMsg(null);
                            }, 5000);
                        });
                },
                storeToken: (JWT) => {
                    SecureStore.setItemAsync("token", JWT);
                    setToken(JWT);
                },
                removeToken: () => {
                    SecureStore.deleteItemAsync("token");
                },
                logout: () => {
                    setToken(null);
                    SecureStore.deleteItemAsync("token");
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
