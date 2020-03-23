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
  Maps: undefined;
  Route: undefined;
  CodeScanner: undefined;
  Settings: undefined;
  Signature: undefined;
  CodeGenerator: undefined;
  QRTest: undefined;
};

export type HomeProps = {
  Home: undefined;
};

export type MapsProps = {
  Maps: undefined;
};

export type RouteProps = {
  Route: undefined;
};

export type ScannerProps = {
  CodeScanner: undefined;
};

export type GeneratorProps = {
  CodeGenerator: undefined;
};

export type QRTestProps = {
  QRTest: undefined;
  QRScan: undefined;
  QRGenerator: undefined;
};

export type SignatureProps = {
  Signature: undefined;
};

export type SettingsProps = {
  Settings: undefined;
};
