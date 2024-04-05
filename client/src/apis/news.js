import axios from "../axios";

export const apiGetAllNews = (params) =>
  axios({
    url: "/news/",
    method: "get",
    params,
  });
export const apiGetNews = (nid) =>
  axios({
    url: "/news/" + nid,
    method: "get",
  });
