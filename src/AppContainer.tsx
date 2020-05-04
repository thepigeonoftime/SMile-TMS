import React from "react";
import {AppTabs} from "./AppTabs";
import {RegisterController} from "./RegisterController";
import {RegisterProvider} from "./RegisterProvider";
import {client} from "./Apollo";
import {ApolloProvider} from "@apollo/react-hooks";

export const AppContainer: React.FC<{}> = ({}) => {
    return (
        <ApolloProvider client={client}>
            <RegisterProvider>
                <RegisterController>
                    <AppTabs />
                </RegisterController>
            </RegisterProvider>
        </ApolloProvider>
    );
};
