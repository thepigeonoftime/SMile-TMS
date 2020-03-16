import React from "react";
import { View } from "react-native";

export const Center: React.FC<{}> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {children}
    </View>
  );
};
