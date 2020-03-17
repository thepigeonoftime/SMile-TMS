import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type AuthProps = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavProps<T extends keyof AuthProps> = {
  navigation: StackNavigationProp<AuthProps, T>;
  route: RouteProp<AuthProps, T>;
};

export type AppProps = {
  Home: undefined;
  Routen: undefined;
};

export type RoutenProps = {
  Routen: undefined;
};
