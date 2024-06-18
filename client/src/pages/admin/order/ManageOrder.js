import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiGetAllOrder, apiDeleteOrder } from "apis";
import defaultt from "assets/default.png";
import moment from "moment";
import { shifts } from "ultils/constant";
import { formatMoney, formatPrice } from "ultils/helper";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const ManageOrder = () => {
  const [open, setOpen] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [order, setOrder] = useState(null);
  const [counts, setCounts] = useState(0);
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  });
  const fetchOrderData = async (params) => {
    const response = await apiGetAllOrder({
      ...params,
      limit: process.env.REACT_APP_PITCH_LIMIT,
    });
    if (response.success) {
      setOrder(response.Bookings);
      setCounts(response.totalCount);
    }
  };

  const queryDebounce = useDebounce(watch("q"), 800);
  const queryDebouncePitch = useDebounce(watch("qpitch"), 800);

  // const [debouncedPitch, setDebouncedPitch] = useState("");
  useEffect(() => {
    let queryParams = {};

    if (queryDebouncePitch) {
      queryParams.qpitch = queryDebouncePitch;
    }

    if (queryDebounce) {
      queryParams.q = queryDebounce;
    }

    const searchParams = createSearchParams(queryParams).toString();

    navigate({
      pathname: location.pathname,
      search: searchParams ? `?${searchParams}` : "",
    });
  }, [queryDebounce, queryDebouncePitch]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchOrderData(searchParams);
  }, [params, update]);

  const handleDeletePitch = (bid) => {
    Swal.fire({
      title: "Are you sure",
      text: "Sure friends ?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteOrder(bid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        render();
      }
    });
  };
  return (
    <div className={`${open ? "w-[83vw]" : "w-[94vw]"} bg-dash-board pl-4`}>
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Manage Orders</h1>
      </div>
      <div className="w-full p-2">
        <div className="pb-2">
          {/* <form className='w-[300px]' onSubmit={handleSubmit(handleManagePitch)}> */}
          <form className="w-[300px]">
            <InputForm
              id="qpitch"
              register={register}
              errors={errors}
              fullWidth
              transform
              placeholder="Search pitch ..."
            />
          </form>
        </div>
        {/* <div className="px-1 pb-2">
          <form className="w-[300px]">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullWidth
              transform
              placeholder="Search status ..."
            />
          </form>
        </div> */}
        <table className="table-auto w-full ">
          <thead className="text-md  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-emerald-700 text-white py-2">
              <th className="text-center h-[60px] rounded-tl-lg">#</th>
              <th className="text-center">Thumb</th>
              <th className="text-center">Pitch</th>
              <th className="text-center">Shift</th>
              <th className="text-center">Booking By</th>
              <th className="text-center">Price</th>
              <th className="text-center">Discount</th>
              <th className="text-center">Total Price</th>
              <th className="text-center w-[150px]">Status</th>
              <th className="text-center">Booked At</th>
              <th className="text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((el, index) => (
              <tr
                className='odd:bg-white even:bg-gray-200/50 odd:dark:bg-gray-300 even:dark:bg-white border-b dark:border-gray-700"'
                key={el._id}
              >
                <td className="text-center px-4 py-4">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    process.env.REACT_APP_PITCH_LIMIT +
                    index +
                    1}
                </td>
                <td className="text-center px-2 py-2">
                  <div className="flex items-center justify-center">
                    {el.pitch?.thumb ? (
                      <img
                        src={el.pitch?.thumb}
                        alt="thumb"
                        className="w-20 h-[70px] object-cover rounded-md"
                      />
                    ) : (
                      <img
                        src={defaultt}
                        alt="thumb"
                        className="w-20 h-[70px] object-cover rounded-md"
                      />
                    )}
                  </div>
                </td>
                <td className="text-center px-2 py-2">{el?.pitch?.title}</td>
                <td className="text-center px-2 py-2">
                  {shifts.find((s) => +s.value === +el.shift)?.time}
                </td>
                <td className="text-center px-2 py-2">{`${el.bookingBy?.firstname} ${el.bookingBy?.lastname} `}</td>
                <td className="text-center px-2 py-2">{`${formatMoney(
                  el?.total
                )} VNĐ`}</td>
                <td className="text-center px-2 py-2">
                  {el?.coupon?.price !== undefined
                    ? `${el?.coupon?.price}%`
                    : "0%"}
                </td>
                <td className="text-center px-2 py-2">{`${formatMoney(
                  el?.total - el?.total * ((el?.coupon?.price || 0) / 100)
                )} VNĐ`}</td>
                <td className="text-center px-2 py-2">
                  <span className={`${el?.status === "Pay By Cash" ? "text-blue-500 bg-blue-300/25 rounded-md p-2" : el?.status === "Success" ? "text-green-500 bg-green-300/25 rounded-md p-2" :  el?.status === "Pending" && "text-yellow-500 bg-yellow-300/25 rounded-md p-2"}`}>{el.status}</span>
                </td>
                <td className="text-center px-2 py-2">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="text-center px-2 py-2">
                  <div>
                    <span
                      onClick={() => handleDeletePitch(el._id)}
                      className="flex items-center justify-center text-2xl text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <MdDeleteForever />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-end my-8">
          <Pagination totalCount={counts} type="orders" />
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
