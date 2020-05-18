import {ApolloProvider} from "@apollo/react-hooks";
import React from "react";
import {client} from "./Apollo";
import {AppTabs} from "./AppTabs";
import {RegisterProvider} from "./RegisterProvider";
import {TourProvider} from "./TourProvider";

export const AppContainer: React.FC<{}> = ({}) => {
    return (
        <ApolloProvider client={client}>
            <RegisterProvider>
                <TourProvider>
                    <AppTabs />
                </TourProvider>
            </RegisterProvider>
        </ApolloProvider>
    );
};
