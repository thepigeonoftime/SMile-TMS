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
    ratingOfDepot: Int
    width: Float
    receiverId: UUID
    height: Float
    positionInTour: Int
    carrierItemId: String
    length: Float
    initialSendDate: ZonedDateTime
    pickDate: ZonedDateTime
    depotId: UUID
    grossWeight: Float
    receiverSignature: String
    dateOfArrivalInDepot: ZonedDateTime
    acceptedByReceiver: Boolean
    ratingOfDriver: Int
    startOfWishTimeframe: ZonedDateTime
    id: UUID!
    dateOfPlannedDelivery: ZonedDateTime
    receiveDate: ZonedDateTime
    bizStep: String
    plannedTimeframeStart: ZonedDateTime
    senderId: UUID
    delivererId: UUID
    price: Int
    propId: String
    sscc: String
    endOfWishTimeframe: ZonedDateTime
    tourId: UUID
){updatePacket(
    PacketUpdateInput: {
        ratingOfDepot : $ratingOfDepot,
        width : $width,
        receiverId : $receiverId,
        height : $height,
        positionInTour : $positionInTour,
        carrierItemId : $carrierItemId,
        length : $length,
        initialSendDate : $initialSendDate,s
        pickDate : $pickDate,
        depotId : $depotId,
        grossWeight : $grossWeight,
        receiverSignature : $receiverSignature,
        dateOfArrivalInDepot : $dateOfArrivalInDepot,
        acceptedByReceiver : $acceptedByReceiver,
        ratingOfDriver : $ratingOfDriver,
        startOfWishTimeframe : $startOfWishTimeframe,
        id : $id,
        dateOfPlannedDelivery : $dateOfPlannedDelivery,
        receiveDate : $receiveDate,
        bizStep : $bizStep,
        plannedTimeframeStart : $plannedTimeframeStart,
        senderId : $senderId,
        delivererId : $delivererId,
        price : $price,
        propId : $propId,
        sscc : $sscc,
        endOfWishTimeframe : $endOfWishTimeframe,
        tourId : $tourId,
        }
    ){
        id
    }
}`;

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

export const structurePacketData = (currentStop, signature, sscc, tourID) => {
    return {
        variables: {
            ratingOfDepot: "1",
            width: "20",
            receiverId: "1",
            height: "20",
            positionInTour: currentStop,
            carrierItemId: "1",
            length: "20",
            initialSendDate: "01.01.1970",
            pickDate: "01.01.1970",
            depotId: "1",
            grossWeight: "20",
            receiverSignature: signature,
            dateOfArrivalInDepot: "01.01.1970",
            acceptedByReceiver: "true",
            ratingOfDriver: "5",
            startOfWishTimeframe: {day: "TUESDAY", hour: 1, minute: 1},
            id: "1",
            dateOfPlannedDelivery: "01.01.1970",
            receiveDate: "01.01.1970",
            bizStep: "1",
            plannedTimeframeStart: {day: "TUESDAY", hour: 1, minute: 1},
            senderId: "1",
            delivererId: "1",
            price: "1",
            propId: "1",
            sscc: sscc,
            endOfWishTimeframe: {day: "TUESDAY", hour: 1, minute: 1},
            tourId: tourID,
        },
    };
};
