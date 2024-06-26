import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
  });

export const apiFinalRegister = (token) =>
  axios({
    url: "/user/finalregister/" + token,
    method: "put",
  });

export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });
export const apiLoginGG = (data) =>
  axios({
    url: "/user/logingg",
    method: "post",
    data,
  });
export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });

export const apiUpdateCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "put",
    data,
  });

export const apiGetUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });
export const apiGetOwner = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });
export const apiUpdateUserByAdmin = (data, uid) =>
  axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });

export const apiDeleteUserByAdmin = (uid) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });

export const apiBooking = (data) =>
  axios({
    url: "/user/booking",
    method: "post",
    data,
  });

export const apiGetUserOrder = (userId) =>
  axios({
    url: "/booking/" + userId,
    method: "get",
  });

export const apiGetUserOrderStatus = (userId) =>
  axios({
    url: "/booking/get-order/" + userId,
    method: "get",
  });

export const apiDeleteOrder = (bid) =>
  axios({
    url: "/booking/" + bid,
    method: "delete",
  });

export const apiStatusOrder = (data) =>
  axios({
    url: "/booking/status",
    method: "put",
    data,
  });

export const apiUpdateWishlist = (pid) =>
  axios({
    url: "/user/wishlist/" + pid,
    method: "put",
  });

export const apiGetWishlist = (uid) =>
  axios({
    url: "/user/wishlist/" + uid,
    method: "get",
  });

// export const apiGetOwner = () =>
//   axios({
//     url: "/user/owner",
//     method: "get",
//   });

export const apiGetAllOrder = (params) =>
  axios({
    url: "/booking/all/",
    method: "get",
    params,
  });
export const apiGetAllOrderPitchOwner = (params) =>
  axios({
    url: "/booking/all-pitchowner/",
    method: "get",
    params,
  });

export const apiGetOrderByAdmin = () =>
  axios({
    url: "/booking/all-order/",
    method: "get",
  });
export const apiUpdateCoupon = (bookingId, couponId) =>
  axios({
    url: "/booking/update",
    method: "post",
     data: { bookingId, couponId }
  });
