import React from "react";
import { AuthProvider } from "./AuthProvider";
import { AuthRouter } from "./AuthRouter";

export const AppContainer: React.FC<{}> = ({}) => {
  return (
    <AuthProvider>
      <AuthRouter />
    </AuthProvider>
  );
};
