import React from "react";
import {TourProvider} from "./TourProvider";
import {TourStack} from "./TourStack";

export const TourContainer = ({navigation, route}) => {
    return (
        <TourProvider>
            <TourStack navigation={navigation} route={route} />
        </TourProvider>
    );
};
