import {dataPersonProps, dataFahrzeugProps, dataGebietProps, dataZeitenProps} from "./Types";
import axios from "axios";
import gql from "graphql-tag";
import {addJob} from "./OfflineQueue";
import moment from "moment";
import uuid from "uuid";

export const fetchTour = () => {
    // return axios.get("https://bpt-lab.org/smile/sphinx/getTours");
    return axios.get("https://unsafe.run/getTours");
};

export const postDelivery = (sscc, receiveDate) => {
    return axios.post("https://bpt-lab.org/smile/caz/tms/delivery-reported", {
        sscc,
        receiveDate,
    });
};

export const CREATE_DELIVERER = gql`
    mutation createDeliverer(
        $costsPerStop: Int!
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
        $deliveryAreas: [String!]
    ) {
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
    }
`;

export const UPDATE_PACKET = gql`
    mutation updatePacket(
        $ratingOfDepot: Int
        $width: Float
        $receiverId: UUID
        $height: Float
        $positionInTour: Int
        $carrierItemId: String
        $length: Float
        $initialSendDate: ZonedDateTime
        $pickDate: ZonedDateTime
        $depotId: UUID
        $grossWeight: Float
        $receiverSignature: String
        $dateOfArrivalInDepot: ZonedDateTime
        $acceptedByReceiver: Boolean
        $ratingOfDriver: Int
        $startOfWishTimeframe: ZonedDateTime
        $id: UUID!
        $dateOfPlannedDelivery: ZonedDateTime
        $receiveDate: ZonedDateTime
        $bizStep: String
        $plannedTimeframeStart: ZonedDateTime
        $senderId: UUID
        $delivererId: UUID
        $price: Int
        $propId: String
        $sscc: String
        $endOfWishTimeframe: ZonedDateTime
        $tourId: UUID
    ) {
        updatePacket(
            packet: {
                ratingOfDepot: $ratingOfDepot
                width: $width
                receiverId: $receiverId
                height: $height
                positionInTour: $positionInTour
                carrierItemId: $carrierItemId
                length: $length
                initialSendDate: $initialSendDate
                pickDate: $pickDate
                depotId: $depotId
                grossWeight: $grossWeight
                receiverSignature: $receiverSignature
                dateOfArrivalInDepot: $dateOfArrivalInDepot
                acceptedByReceiver: $acceptedByReceiver
                ratingOfDriver: $ratingOfDriver
                startOfWishTimeframe: $startOfWishTimeframe
                id: $id
                dateOfPlannedDelivery: $dateOfPlannedDelivery
                receiveDate: $receiveDate
                bizStep: $bizStep
                plannedTimeframeStart: $plannedTimeframeStart
                senderId: $senderId
                delivererId: $delivererId
                price: $price
                propId: $propId
                sscc: $sscc
                endOfWishTimeframe: $endOfWishTimeframe
                tourId: $tourId
            }
        )
    }
`;

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

export const structurePacketData = (signature, sscc, tourID, currentStop) => {
    // structure registration data for createDeliverer
    return {
        variables: {
            ratingOfDepot: 1,
            width: 20,
            receiverId: uuid.v4(),
            height: 20,
            positionInTour: parseInt(currentStop),
            carrierItemId: "1",
            length: 20,
            initialSendDate: new Date().toJSON(),
            pickDate: new Date().toJSON(),
            depotId: uuid.v4(),
            grossWeight: 20,
            receiverSignature: signature,
            dateOfArrivalInDepot: new Date().toJSON(),
            acceptedByReceiver: true,
            ratingOfDriver: 5,
            startOfWishTimeframe: new Date().toJSON(),
            id: uuid.v4(),
            dateOfPlannedDelivery: new Date().toJSON(),
            receiveDate: new Date().toJSON(),
            bizStep: "1",
            plannedTimeframeStart: new Date().toJSON(),
            senderId: uuid.v4(),
            delivererId: uuid.v4(),
            price: 1,
            propId: uuid.v4(),
            sscc: sscc,
            endOfWishTimeframe: new Date().toJSON(),
            // tourId: tourID,
            tourID: uuid.v4(),
        },
    };
};
