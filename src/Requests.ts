import {dataPersonProps, dataFahrzeugProps, dataGebietProps, dataZeitenProps} from "./Types";
import Axios from "axios";
import gql from "graphql-tag";
import {addJob} from "./OfflineQueue";

export const fetchTour = () => {
    return Axios.get("https://unsafe.run/getTours");
};

export const postDelivery = (id) => {
    return new Promise((resolve, reject) => {
        Axios.post("http://127.0.0.1:3001/reportDelivery", id)
            .then((response) => {
                console.log(response.status);
                resolve("succesful");
            })
            .catch((error) => {
                addJob(id, "reportDelivery", "null");
            });
    });
};

export const CREATE_DELIVERER = gql(`
mutation createDeliverer($costsPerStop: Int!
  $delivererLastName: String!
  $vehicleType: String!
  $tmsCarrierId: String!
  $deliveryCapacityWeight: Float!
  $delivererFirstName: String!
  $deliveryCapacityVolume: Float!
  $costsPerKm: Int!
  $costsPerHour: Int!
  $maxStopsPerTour: Int
  $cutOffTimes: [TimeInWeekInput!]
  $wishTimeframes: [WishTimeframeInput!]
  $maxPacketnumberPerTour: Int
  $deliveryAreas: [String!]){
  createDeliverer(
    deliverer: {
      costsPerHour: $costsPerHour
      costsPerKm: $costsPerKm
      costsPerStop: $costsPerStop
      cutOffTimes: $cutOffTimes
      delivererFirstName: $delivererFirstName
      delivererLastName: $delivererLastName
      deliveryAreas: $deliveryAreas
      deliveryCapacityVolume: $deliveryCapacityVolume
      deliveryCapacityWeight: $deliveryCapacityWeight
      maxPacketnumberPerTour: $maxPacketnumberPerTour
      maxStopsPerTour: $maxStopsPerTour
      tmsCarrierId: $tmsCarrierId
      vehicleType: $vehicleType
      wishTimeframes: $wishTimeframes
    }
  ) {
    costsPerHour
    costsPerKm
    costsPerStop
    cutOffTimes {
      day
    }
    delivererFirstName
    delivererLastName
    deliveryAreas
    deliveryCapacityVolume
    deliveryCapacityWeight
    maxPacketnumberPerTour
    maxStopsPerTour
    tmsCarrierId
    vehicleType
    wishTimeframes {
      day
      startTime
    }
    id
  }
}`);

export const structureRegData = (
    dataPerson: dataPersonProps,
    dataFahrzeug: dataFahrzeugProps,
    dataGebiet: dataGebietProps,
    dataZeiten: dataZeitenProps
) => {
    if (dataPerson && dataFahrzeug && dataGebiet && dataZeiten) {
        console.log(dataGebiet.zustellGebietPLZ);
        return {
            variables: {
                costsPerHour: parseInt(dataGebiet.grundpreis),
                costsPerKm: parseInt(dataGebiet.preisProKm),
                costsPerStop: parseInt(dataGebiet.preisProStop),
                cutOffTimes: [
                    {day: "MONDAY", hour: 1, minute: 1},
                    {day: "TUESDAY", hour: 1, minute: 1},
                ],
                delivererFirstName: dataPerson.vorname,
                delivererLastName: dataPerson.nachname,
                deliveryAreas: parseInt(dataGebiet.zustellGebietPLZ),
                deliveryCapacityVolume: parseInt(dataFahrzeug.ladevolumen),
                deliveryCapacityWeight: 1,
                maxPacketnumberPerTour: 1,
                maxStopsPerTour: 1,
                tmsCarrierId: "0",
                vehicleType: dataFahrzeug.fahrzeugArt,
                wishTimeframes: [
                    {day: "MONDAY", startTime: 1},
                    {day: "TUESDAY", startTime: 1},
                ],
            },
        };
    } else {
        // handle missing data
    }
};
