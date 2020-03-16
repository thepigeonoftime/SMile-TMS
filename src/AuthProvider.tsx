import React, { useState } from "react";
import { AsyncStorage } from "react-native";

type User = null | { username: string };

export const AuthContext = React.createContext<{
  user: User;
  login: () => void;
  logout: () => void;
  signup: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const dummyUser = { username: "smile" };
          setUser(dummyUser);
          AsyncStorage.setItem("user", JSON.stringify(dummyUser));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
        signup: () => {
          const dummyUser = { username: "smile" };
          setUser(dummyUser);
          AsyncStorage.setItem("user", JSON.stringify(dummyUser));
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
