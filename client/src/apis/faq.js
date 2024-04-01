import axios from "../axios";

export const apiGetFaq = (params) =>
  axios({
    url: "/faq/",
    method: "get",
    params,
  });
