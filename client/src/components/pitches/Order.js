import React, { memo, useEffect, useState, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  apiDeleteOrder,
  apiGetUserOrderStatus,
  apiGetCoupon,
  apiUpdateCoupon,
} from "apis";
import defaultImage from "assets/default.png";
import { shifts } from "ultils/constant";
import { formatMoney, formatPrice } from "ultils/helper";
import { Button } from "components";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import path from "ultils/path";
import { showOrder } from "store/app/appSlice";
import moment from "moment";
import { updateCart } from "store/user/userSlice";
import { useTranslation } from "react-i18next";

const Order = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { order1, order2, order3, order4, order5, order6, order7, order8, order9, order10 } = t("order")
  const navigate = useNavigate();
  const { current, isUpdateCart } = useSelector((state) => state.user);
  const [order, setOrder] = useState(null);
  const [title, settitle] = useState("");
  const [discount, setdiscount] = useState(null);
  const [orderIds, setOrderIds] = useState([]);
  const [ownerId, setOwnerId] = useState([]);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const fetchPitchData = async () => {
    const response = await apiGetUserOrderStatus(current?._id);
    if (response.success) {
      const fetchedOrderIds = response.Booking.map((order) => order._id);
      const fetchedOwner = response.Booking.map((order) => order.owner);

      // Store order IDs in state
      setOrderIds(fetchedOrderIds);
      setOwnerId(fetchedOwner);
      setOrder(response.Booking);
    }
  };

  const updateOrder = async (bid) => {
    const response = await apiDeleteOrder(bid);

    if (response.success) {
      dispatch(updateCart());
      fetchPitchData();
      toast.success(response?.message);
    } else toast.error(response.message);
  };

  const updateCoupon = async () => {
    const response = await apiGetCoupon({ title, ownerId });
    if (response.success) {
      setdiscount(response.coupon);
      toast.success("Add coupon successfully");
      for (const orderId of orderIds) {
        const updateBookingResponse = await apiUpdateCoupon(
          orderId,
          response.coupon
        );
        // Handle update response if needed
      }
    } else {
      toast.error(response.coupon);
    }
  };

  useEffect(() => {
    // console.log("RERENDER ORDER")
    const setTimeoutId = setTimeout(() => {
      fetchPitchData();
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [isUpdateCart]);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[450px] h-screen overflow-y-auto bg-white text-black shadow-2xl flex flex-col dark:bg-medium"
    >
      <div className="p-4 flex justify-between items-center font-bold text-xl border-b-2 border-gray-300 dark:text-white">
        <span>{order1}</span>
        <span onClick={() => dispatch(showOrder())} className=" cursor-pointer">
          <IoMdClose />
        </span>
      </div>

      <div className="h-4/6 flex flex-col gap-3 overflow-y-auto py-3">
        {(!order || order?.length === 0) && (
          <span className="flex justify-center text-sm italic dark:text-white">
            {order2}
          </span>
        )}
        {order &&
          order?.map((el) => (
            <div className="mx-3 dark:text-white" key={el._id}>
              <div className="flex justify-between items-center border-b">
                <div className="flex gap-2 p-4 items-center tracking-wide">
                  <img
                    src={el.pitch?.thumb || defaultImage}
                    alt="thumb"
                    className="w-20 h-24 object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="flex gap-1 font-bold text-md">
                        {el.pitch?.title}
                      </span>
                      <span className="text-xs">({el.pitch?.category})</span>
                    </div>
                    <span className="text-xs text-yellow-500">
                      {moment(el?.bookedDate)?.format("dddd MM YYYY")}
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-800">
                      {shifts.find((s) => s.value === +el.shift)?.time}
                    </span>
                    <button
                      className="w-fit px-2 py-1 my-2 gap-2 flex items-center justify-center cursor-pointer border bg-red-500 rounded-md hover:bg-red-800 duration-300"
                      onClick={() => updateOrder(el._id)}
                    >
                      <span className="text-xs text-white border-r pr-2">
                        {order3}
                      </span>
                      <span className="h-5 w-5 flex items-center duration-500 text-white">
                        <MdDeleteForever size={16} />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="font-bold tracking-wider">
                  <span className="text-sm text-red-500">
                    {`${formatMoney(formatPrice(el.total))} VNĐ`}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="h-2/6 flex flex-col gap-2 pt-8 border-t-2">
        <div className="flex items-center mx-4 justify-between gap-4">
          <input
            type="text"
            id="title"
            value={title}
            className="w-full rounded-lg"
            placeholder={order4}
            onChange={(e) => settitle(e.target.value)}
          ></input>
          <button
            onClick={() => {
              updateCoupon();
            }}
            className=" px-6 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 duration-300 border-2 border-red-500"
          >
            <span>{order5}</span>
          </button>
        </div>
        <div className="flex items-center mx-4 justify-between dark:text-white">
          <span>{order6}:</span>
          <span>
            {formatMoney(
              order?.reduce((sum, el) => sum + Number(el.total), 0)
            ) + ` VND`}
          </span>
        </div>
        <div className="flex items-center mx-4 justify-between dark:text-white">
          <span>{order7} ({discount?.title}): </span>
          <span>
            {discount
              ? formatMoney(
                order?.reduce((sum, el) => sum + Number(el.total), 0) *
                (discount.price / 100)
              ) + ` VND`
              : "0 VND"}{" "}
          </span>
        </div>
        <div className="flex items-center mx-4 justify-between font-bold dark:text-white">
          <span>{order8}:</span>
          <span>
            {formatMoney(
              order?.reduce((sum, el) => sum + Number(el.total), 0) -
              (discount
                ? order?.reduce(
                  (sum, el) => sum + Number(el.pitch?.price),
                  0
                ) *
                (discount.price / 100)
                : 0)
            ) + ` VND`}
          </span>
        </div>
        <div className="flex justify-center gap-4 w-full ">
          <button
            onClick={() => {
              dispatch(showOrder());
            }}
            className="my-4 ml-4 py-2 w-1/2 bg-gray-500 rounded-md text-white hover:bg-gray-600 duration-300"
          >
            <span>{order9}</span>
          </button>
          <button
            onClick={() => {
              dispatch(showOrder());
              navigate(`${path.DETAIL_ORDER}`);
            }}
            className="my-4 mr-4 py-2 w-1/2 bg-red-500 rounded-md text-white hover:bg-red-600 duration-300"
          >
            <span>{order10}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Order);
