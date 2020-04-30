import React from "react";
import {TourProvider} from "./TourProvider";
import {TourStack} from "./TourStack";

export const TourContainer = ({navigation}) => {
    return (
        <TourProvider navigation={navigation}>
            <TourStack />
        </TourProvider>
    );
};
