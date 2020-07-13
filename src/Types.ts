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
    Settings: undefined;
    Maps: undefined;
    DepotAuth: undefined;
    PaketeScannen: undefined;
    Ziel: undefined;
    Authentifizierung: undefined;
    CodeScanner: undefined;
    Signature: undefined;
};

export type RegisterStackProps = {
    Register: undefined;
    RegisterPerson: undefined;
    RegisterFahrzeug: undefined;
    RegisterGebietPreis: undefined;
    RegisterZeiten: undefined;
};

export type RegisterContextProps = {
    loading: boolean;
    registered: null | string;
    dataPerson: any;
    dataFahrzeug: any;
    dataGebiet: any;
    dataZeiten: any;
    showRegModal: boolean;
    register: () => void;
    unregister: () => void;
    registration: () => any;
    storeDataPerson: (data, toStorage) => void;
    storeDataFahrzeug: (data, toStorage) => void;
    storeDataGebiet: (data, toStorage) => void;
    storeDataZeiten: (data, toStorage) => void;
    toggleRegModal: () => void;
};

export type dataPersonProps = {
    vorname: string;
    nachname: string;
    firma: string;
    strasse: string;
    hausnummer: string;
    plz: string;
    ort: string;
    telefon: string;
};

export type dataFahrzeugProps = {
    fahrzeugArt: string;
    ladevolumen: string;
    laenge: string;
    breite: string;
    hoehe: string;
};

export type dataGebietProps = {
    zustellGebietPLZ: string;
    entfernungTour: string;
    vorlaufZeit: string;
    grundpreis: string;
    preisProKm: string;
    preisProStop: string;
};

export type dataZeitenProps = {
    monday?: {
        day: string;
        start: string;
        end: string;
    };
    tuesday?: {
        day: string;
        start: string;
        end: string;
    };
    wednesday?: {
        day: string;
        start: string;
        end: string;
    };
    thursday?: {
        day: string;
        start: string;
        end: string;
    };
    friday?: {
        day: string;
        start: string;
        end: string;
    };
    saturday?: {
        day: string;
        start: string;
        end: string;
    };
};

export type resultProps = {
    monday?: {};
    tuesday?: {};
    wednesday?: {};
    thursday?: {};
    friday?: {};
    saturday?: {};
};

export type wishTimeFrame = {
    day: string;
    startTime: number;
    endTime: number;
};

export type ZielProps = {
    _id: string;
    street: string;
    firstName: string;
    lastName: string;
    city: string;
    id: string;
    startTime: string;
    endTime: string;
    plannedTimeframeStart: string;
    organization: string | null;
    zip: string;
    receiverLevel?: string | null;
    receiverRemark?: string;
};
