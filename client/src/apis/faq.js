import axios from "../axios";

export const apiGetFaq = (params) =>
  axios({
    url: "/faq/",
    method: "get",
    params,
  });

  export const apiCreateFAQ = (data) =>
  axios({
    url: "/faq/",
    method: "post",
    data,
  });

  export const apiDeleteFAQ = (fid) =>
    axios({
      url: "/faq/" + fid,
      method: "delete",
    });

  export const apiUpdateFAQ = (data, fid) =>
    axios({
      url: "/faq/" + fid,
      method: "put",
      data,
    });

