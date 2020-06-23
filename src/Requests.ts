import {dataPersonProps, dataFahrzeugProps, dataGebietProps, dataZeitenProps} from "./Types";
import axios from "axios";
import gql from "graphql-tag";
import uuid from "uuid";

export const postSignup = (email, password) => {
    return axios.post("https://pickshare.herokuapp.com/users/register", {
        headers: {
            "Content-Type": "application/json",
        },
        password,
        email,
        role: 3,
        inviter: "5ec5002102cbd20015130c76",
        firstName: "tbd",
        lastName: "tbd",
    });
};

export const postLogin = (alias, password) => {
    return axios.post("https://pickshare.herokuapp.com/auth", {
        headers: {
            "Content-Type": "application/json",
        },
        alias,
        password,
    });
};

export const fetchTour = () => {
    // return axios.get("https://bpt-lab.org/smile/sphinx/getTours");
    return axios.get("https://unsafe.run/getTours");
};

export const postPickup = (sscc, pickDate) => {
    return axios.post("https://bpt-lab.org/smile/caz/tms/pick-up-reported", {
        sscc,
        pickDate,
    });
};

export const postDelivery = (sscc, receiveDate) => {
    return axios.post("https://bpt-lab.org/smile/caz/tms/delivery-reported", {
        sscc,
        receiveDate,
    });
};

export const calculateDistance = (origin, destination, waypoints) => {
    return axios.get(`https://maps.googleapis.com/maps/api/directions/json?\
origin=${origin}&\
destination=${destination}&\
waypoints=${waypoints}&\
key=AIzaSyDzgQenA9LdgC7sIXpng2GgV9lvasHUFOo`);
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
                endTime
            }
            id
        }
    }
`;

export const CREATE_PACKET = gql`
    mutation createPacket(
        $senderId: UUID!
        $depotId: UUID!
        $bizStep: String!
        $initialSendDate: ZonedDateTime!
        $sscc: String!
        $dateOfPlannedDelivery: ZonedDateTime!
        $receiverId: UUID!
    ) {
        createPacket(
            packet: {
                senderId: $senderId
                depotId: $depotId
                bizStep: $bizStep
                initialSendDate: $initialSendDate
                sscc: $sscc
                dateOfPlannedDelivery: $dateOfPlannedDelivery
                receiverId: $receiverId
            }
        ) {
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
    # mutation updatePacket($id: UUID!) {
    #     updatePacket(packet: {id: "abd3a176-dead-4999-b4e2-ea67b79c5416"})
    # }
`;

export const QUERY_PACKETS = gql`
    query {
        packets {
            id
        }
        deliverers {
            id
        }
        depots {
            id
        }
        receivers {
            id
        }
        senders {
            id
        }
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
                    {day: "MONDAY", startTime: 12, endTime: 18},
                    {day: "TUESDAY", startTime: 12, endTime: 18},
                ],
            },
        };
    } else {
        // handle missing data
    }
};

export const structureCreatePacketData = (sscc) => {
    return {
        variables: {
            senderId: "bf771bcb-9ec8-4d9a-94e5-50db4143cdd2",
            depotId: "13450ab4-970f-4d04-bde6-952765c357e4",
            bizStep: "1",
            initialSendDate: new Date().toJSON(),
            sscc: sscc,
            dateOfPlannedDelivery: new Date().toJSON(),
            receiverId: "ab6854df-d671-4def-9fbe-804f9d08288d",
        },
    };
};

export const structurePacketData = (signature, sscc, tourID, currentStop) => {
    // structure registration data for createDeliverer
    return {
        variables: {
            ratingOfDepot: 1,
            width: 20,
            receiverId: "ab6854df-d671-4def-9fbe-804f9d08288d",
            height: 20,
            positionInTour: parseInt(currentStop),
            carrierItemId: "1",
            length: 20,
            initialSendDate: new Date().toJSON(),
            pickDate: new Date().toJSON(),
            depotId: "8b82621f-e658-4658-9f3b-e1e47e982654",
            grossWeight: 20,
            receiverSignature: signature,
            dateOfArrivalInDepot: new Date().toJSON(),
            acceptedByReceiver: true,
            ratingOfDriver: 5,
            startOfWishTimeframe: new Date().toJSON(),
            id: "abd3a176-dead-4999-b4e2-ea67b79c5416",
            dateOfPlannedDelivery: new Date().toJSON(),
            receiveDate: new Date().toJSON(),
            bizStep: "1",
            plannedTimeframeStart: new Date().toJSON(),
            // senderId: uuid.v4(),
            delivererId: "c5790573-a9c0-4f49-a34b-f9866acebf32",
            price: 1,
            // propId: uuid.v4(),
            sscc: sscc,
            endOfWishTimeframe: new Date().toJSON(),
            // tourId: tourID,
            // tourID: uuid.v4(),
        },
    };
};
