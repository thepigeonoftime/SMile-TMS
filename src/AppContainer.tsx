import React from "react";
import {AppTabs} from "./AppTabs";
import {RegisterController} from "./RegisterController";
import {RegisterProvider} from "./RegisterProvider";

export const AppContainer: React.FC<{}> = ({}) => {
    return (
        <RegisterProvider>
            <RegisterController>
                <AppTabs />
            </RegisterController>
        </RegisterProvider>
    );
};
