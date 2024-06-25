import axios from "../axios";


export const apiZalopay = (data) =>
    axios({
        url: "/booking/payment",
        method: "post",
        data,
    });