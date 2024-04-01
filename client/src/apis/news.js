import axios from "../axios";

export const apiGetNews = (params) =>
  axios({
    url: "/news/",
    method: "get",
    params,
  });
