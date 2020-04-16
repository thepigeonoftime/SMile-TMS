import React from "react";
import {TourProvider} from "./TourProvider";
import {TourStack} from "./TourStack";

export const TourContainer: React.FC<{}> = ({}) => {
    return (
        <TourProvider>
            <TourStack />
        </TourProvider>
    );
};
