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
mutation createDeliverer($costsPerHour: Int!){
  createDeliverer(
    deliverer: {
      costsPerHour: $costsPerHour
      costsPerKm: 1
      costsPerStop: 1
      cutOffTimes: { day: MONDAY, minute: 1, hour: 1}
      delivererFirstName: "Peter"
      delivererLastName: "Wurst"
      deliveryAreas: "berlin"
      deliveryCapacityVolume: 1
      deliveryCapacityWeight: 1
      maxPacketnumberPerTour: 1
      maxStopsPerTour: 1
      tmsCarrierId: "0"
      vehicleType: "typ"
      wishTimeframes: [
                        {day: MONDAY, startTime: 1},
                        {day: TUESDAY, startTime: 12},
                    ],
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
    }
  }
}`);

export const structureRegData = (dataPerson, dataFahrzeug, dataGebiet, dataZeiten) => {
    if (dataPerson && dataFahrzeug && dataGebiet && dataZeiten) {
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
                deliveryAreas: dataPerson.ort,
                deliveryCapacityVolume: dataFahrzeug.ladevolumen,
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
