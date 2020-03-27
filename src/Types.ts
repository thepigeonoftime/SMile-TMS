import {TourProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export type AuthProps = {
    Login: undefined;
    Register: undefined;
};

export type AuthNavProps<T extends keyof AuthProps> = {
    navigation: StackNavigationProp<AuthProps, T>;
    route: TourProp<AuthProps, T>;
};

export type AppProps = {
    Home: undefined;
    Maps: undefined;
    Tour: undefined;
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

export type TourProps = {
    Tour: undefined;
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
