import React from "react";
import { AuthProvider } from "./AuthProvider";

export const AppContainer: React.FC<{}> = ({}) => {
  return (
    <AuthProvider>
      { /* <AppRouter/> */ }
    </AuthProvider>
  );
};
