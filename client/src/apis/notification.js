import axios from "../axios";

export const apiGetNotifications = () =>
  axios({
    url: "/notification/",
    method: "get",
  });
