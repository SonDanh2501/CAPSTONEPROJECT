import axios from "../axios";

export const apiGetCoupon = (data) =>
    axios({
        url: "/coupon/update",
        method: "post",
        data
    });
export const apiGetAllCoupon = () =>
    axios({
        url: "/coupon/",
        method: "get",

    });
