import * as SecureStore from "expo-secure-store";
import React, {useState} from "react";
import {postLogin, postSignup} from "./Requests";

type Token = null | string;

export const AuthContext = React.createContext<{
    token: Token;
    loginMsg: string;
    signupMsg: string;
    signup: (user, password) => void;
    login: (user, password) => void;
    storeToken: (token) => void;
    logout: () => void;
}>({
    token: null,
    loginMsg: null,
    signupMsg: null,
    signup: () => {},
    login: () => {},
    storeToken: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{}> = ({children}) => {
    const [token, setToken] = useState<Token>(null);
    const [loginMsg, setLoginMsg] = useState<string>(null);
    const [signupMsg, setSignupMsg] = useState<string>(null);

    return (
        <AuthContext.Provider
            value={{
                token,
                loginMsg,
                signupMsg,
                signup: (user, password) => {
                    postSignup(user, password)
                        .then((response) => {
                            console.log(response);
                            setSignupMsg(
                                "Registrierung erfolgreich\nBitte bestätigen Sie Ihre E-Mail Adresse"
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                            setSignupMsg("Registrierung fehlgeschlagen");
                            setTimeout(() => {
                                setSignupMsg(null);
                            }, 5000);
                        });
                },
                login: (user, password) => {
                    postLogin(user, password)
                        .then((response) => {
                            SecureStore.setItemAsync("token", response.data.token);
                            setToken(response.data.token);
                        })
                        .catch((err) => {
                            console.log(err);
                            setLoginMsg("Login fehlgeschlagen");
                            setTimeout(() => {
                                setLoginMsg(null);
                            }, 5000);
                        });
                },
                storeToken: (token) => {
                    SecureStore.setItemAsync("token", token);
                    setToken(token);
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
