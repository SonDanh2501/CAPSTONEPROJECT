import axios from "../axios";

export const apiCreateNotifications = (data) =>
  axios({
    url: "/notification/",
    method: "post",
    data,
  });

export const apiGetNotifications = () =>
  axios({
    url: "/notification/",
    method: "get",
  });

export const apiGetFavoriteNotifications = (params) =>
  axios({
    url: "/notification/favorite/",
    method: "get",
    params,
  });
