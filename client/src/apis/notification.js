import axios from "../axios";

export const apiGetNotifications = (params) =>
  axios({
    url: "/notification/",
    method: "get",
    params,
  });


export const apiGetFavoriteNotifications = (userId) =>
  axios({
    url: "/notification/favorite/" + userId,
    method: "get",
  });

export const apiCreateNotifications = (data) =>
  axios({
    url: "/notification/",
    method: "post",
    data,
  });

export const apiUpdateNotification = (data, noid) =>
  axios({
    url: "/notification/" + noid,
    method: "put",
    data,
  });
