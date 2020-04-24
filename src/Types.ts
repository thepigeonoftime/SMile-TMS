import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export type AuthProps = {
    Login: undefined;
    Signup: undefined;
};

export type AuthNavProps<T extends keyof AuthProps> = {
    navigation: StackNavigationProp<AuthProps, T>;
    route: RouteProp<AuthProps, T>;
};

export type AppTabsProps = {
    TourStarten: undefined;
    TourLogbuch: undefined;
    Settings: undefined;
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

export type TourStackProps = {
    TourSuche: undefined;
    TourStart: undefined;
    TourLogbuch: undefined;
    Settings: undefined;
    Maps: undefined;
    PaketeLaden: undefined;
    Ziel: undefined;
};
