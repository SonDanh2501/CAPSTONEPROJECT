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
export const apiCreateNews = (data) =>
  axios({
    url: "/news/",
    method: "post",
    data,
  });

export const apiDeleteNews = (nid) =>
  axios({
    url: "/news/" + nid,
    method: "delete",
  });
export const apiUpdateNews = (data, nid) =>
  axios({
    url: "/news/" + nid,
    method: "put",
    data,
  });
