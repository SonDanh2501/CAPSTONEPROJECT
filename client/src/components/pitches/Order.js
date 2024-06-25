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
      <div className="py-4 px-6 flex justify-between items-center font-bold text-xl border-b-2 bg-button-color border-button-color dark:text-white">
        <span className="font-bold text-white">{order1}</span>
        {order?.length === 0 ? (
          <span
            onClick={() => dispatch(showOrder())}
            className="font-bold text-white cursor-pointer"
          >
            <IoMdClose />
          </span>
        ) : (
          <span
            onClick={() => dispatch(showOrder())}
            className="font-bold text-white cursor-pointer"
          >
            {order?.length} items
          </span>
        )}
      </div>
      <div className="h-4/6 flex flex-col gap-3 overflow-y-auto py-3">
        {/*If cart is empty */}
        {(!order || order?.length === 0) && (
          <span className="flex h-full w-full items-center justify-center text-sm italic dark:text-white">
            {order2}
          </span>
        )}
        {/*If cart having order */}
        {order &&
          order?.map((el) => (
            <div className="mx-8 dark:text-white" key={el._id}>
              <div className="flex items-center border border-button-color">
                <div className="w-full flex gap-2 p-4 items-center tracking-wide ">
                  <img
                    src={el.pitch?.thumb || defaultImage}
                    alt="thumb"
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-1">
                      <span className="flex gap-1 font-bold text-md">
                        {el.pitch?.title}
                      </span>
                      <span className="text-xs">({el.pitch?.category})</span>
                    </div>
                    <div className="flex gap-2 pt-0.5">
                      <span className="text-xs">
                        {moment(el?.bookedDate)?.format("DD/MM/YYYY")}
                      </span>
                      <span className="text-xs dark:text-green-800">
                        ({shifts.find((s) => s.value === +el.shift)?.time})
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xs text-green-800">
                        {`${formatMoney(formatPrice(el.total))} VNĐ`}
                      </span>
                      <span
                        onClick={() => updateOrder(el._id)}
                        className="flex p-2 items-center duration-500 text-red-500 hover:text-white hover:bg-red-500 rounded-full cursor-pointer"
                      >
                        <MdDeleteForever size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/*Button */}
      {!(!order || order?.length === 0) && (
        <div className="h-2/6 flex flex-col gap-2 pt-2 border-t-2">
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
              className=" px-6 py-2 bg-button-color-hover rounded-md text-white duration-300 border-2 border-button-color-hover"
            >
              <span className="font-bold">{order5}</span>
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
            <span>
              {order7} ({discount?.title}):{" "}
            </span>
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
                    ? order?.reduce((sum, el) => sum + Number(el.total), 0) *
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
              className="ml-4 py-2 w-1/2 bg-button-color-hover rounded-md text-black duration-300"
            >
              <span className="font-bold">{order9}</span>
            </button>
            <button
              onClick={() => {
                dispatch(showOrder());
                navigate(`${path.DETAIL_ORDER}`);
              }}
              className="mr-4 py-2 w-1/2 bg-button-color rounded-md text-white duration-300"
            >
              <span className="font-bold">{order10}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Order);
