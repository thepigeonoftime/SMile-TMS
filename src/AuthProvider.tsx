import * as SecureStore from "expo-secure-store";
import React, {useState} from "react";
import {postLogin, postSignup} from "./Requests";

type Token = null | string;

export const AuthContext = React.createContext<{
    token: Token;
    signup: (user, password) => void;
    login: (user, password) => void;
    storeToken: (token) => void;
    logout: () => void;
}>({
    token: null,
    signup: () => {},
    login: () => {},
    storeToken: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{}> = ({children}) => {
    const [token, setToken] = useState<Token>(null);
    return (
        <AuthContext.Provider
            value={{
                token,
                signup: (user, password) => {
                    postSignup(user, password)
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((err) => {
                            console.log(err);
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
