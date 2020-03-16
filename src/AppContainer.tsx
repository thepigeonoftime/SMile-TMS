import React from "react";
import { AuthProvider } from "./AuthProvider";
import { AppRouter } from "./AppRouter";

export const AppContainer: React.FC<{}> = ({}) => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
