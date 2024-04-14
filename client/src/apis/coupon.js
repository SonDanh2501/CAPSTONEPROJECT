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
export const apiCreateCoupon = (data) =>
    axios({
        url: "/coupon/",
        method: "post",
        data,
    });

export const apiGetCouponAdmin = (params) =>
    axios({
        url: "/coupon/couponadmin",
        method: "get",
        params,
    });

export const apiUpdateCouponAdmin = (data, fid) =>
    axios({
        url: "/coupon/" + fid,
        method: "put",
        data,
    });
export const apiDeleteCoupon = (fid) =>
    axios({
        url: "/coupon/" + fid,
        method: "delete",
    });

export const apiCreateCouponPitchOwner = (data) =>
    axios({
        url: "/coupon/po",
        method: "post",
        data,
    });
