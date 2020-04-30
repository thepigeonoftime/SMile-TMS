import Axios from "axios";
// import {RegisterContext} from "./RegisterProvider";
import {initQueue, addJob} from "./OfflineQueue";
import {RegisterContext} from "./RegisterProvider";
import {useContext} from "react";

export const fetchTour = () => {
    return Axios.get("https://unsafe.run/getTours");
};

export const registerRequest = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post("http://127.0.0.1:3001/registerData", data)
            .then((response) => {
                console.log(response.status);
                resolve("succesful");
            })
            .catch((error) => {
                addJob("register", "register", "register");
                reject("register error");
                console.log(error.message);
            });
    });
};

export const postDelivery = (id) => {
    const {registration} = useContext(RegisterContext);
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
