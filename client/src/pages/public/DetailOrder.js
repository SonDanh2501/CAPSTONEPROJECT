import React, { memo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiGetUserOrderStatus, apiGetCoupon } from "apis";
import defaultImage from "assets/default.png";
import { shifts } from "ultils/constant";
import { formatMoney, convertToTitleCase, formatPrice } from "ultils/helper";
import { Breadcrumb, Button } from "components";
import path from "ultils/path";
import { useTranslation } from "react-i18next";


const DetailOrder = () => {

  const { t } = useTranslation();
  const { detailorder1, detailorder2, detailorder3, detailorder4, detailorder5, detailorder6, detailorder7, detailorder8, detailorder9, detailorder10 } = t("detailorder")
  const navigate = useNavigate();
  const location = useLocation();
  const { current } = useSelector((state) => state.user);
  const [order, setOrder] = useState(null);
  const [orderChanged, setOrderChanged] = useState(false);
  // const discount = JSON.parse(localStorage.getItem('discount')); // Accessing discount state from localStorage
  const [discount, setDiscount] = useState(null);
  const fetchPitchData = async () => {
    const response = await apiGetUserOrderStatus(current?._id);
    if (response.success) {
      const firstOrder = response.Booking[0]; // Get the first order
      const fetchedDiscount =
        firstOrder && firstOrder.coupon ? firstOrder.coupon.price : null;
      setDiscount(fetchedDiscount);
      setOrder(response.Booking);
      setOrderChanged(false);
    }
  };
  useEffect(() => {
    fetchPitchData();
  }, [order, orderChanged]);
  console.log(discount)
  return (
    <div className="w-full dark:bg-medium">
      <div className="h-[81px] flex justify-center items-center bg-gray-100 dark:bg-dark">
        <div className="w-main dark:text-white">
          <h3 className="font-semibold uppercase">{detailorder1} </h3>
          <Breadcrumb category={convertToTitleCase(location?.pathname)} />
        </div>
      </div>
      <div className="flex flex-col border my-8 w-main mx-auto">
        <div className="w-[1378px] mx-auto bg-gray-200  font-bold  py-3 grid grid-cols-10 dark:bg-dark dark:text-white">
          <span className="col-span-6 w-full text-center">{detailorder2} </span>
          <span className="col-span-1 w-full text-center">{detailorder3} </span>
          <span className="col-span-3 w-full text-center">{detailorder4} </span>
        </div>
        {order?.map((el) => (
          <div
            key={el._id}
            className="w-main mx-auto font-bold border-b py-3 grid grid-cols-10"
          >
            <div>
              <img
                src={el.pitch?.thumb || defaultImage}
                alt="thumb"
                className="w-40 h-28 object-cover ml-5"
              />
            </div>
            <span className="col-span-4 w-full flex items-center justify-center">
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 items-center justify-center dark:text-white">
                  <span className="text-green-700 text-xl">{el.pitch?.title}</span>
                  <span className="text-md">{el.pitch?.category}</span>
                  <span className="text-md">{el.pitch?.address}</span>
                </div>
              </div>
            </span>
            <span className="col-span-3 w-full h-full flex items-center justify-center text-center dark:text-white">
              <span className="text-xl ">
                {shifts.find((s) => s.value === +el.shift)?.time}
              </span>
            </span>
            <span className="col-span-1 w-full h-full flex items-center justify-center text-center dark:text-white">
              <span className="text-xl ">
                {formatMoney(formatPrice(el.total)) + ` VND`}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="w-main flex flex-col mb-12 gap-3 items-end mx-auto dark:text-white">
        <div className="flex items-center mx-4 gap-8 dark:text-white">
          <span> {detailorder5}:</span>
          <span className="text-green-700">
            {formatMoney(
              order?.reduce((sum, el) => sum + Number(el.total), 0)
            ) + ` VND`}
          </span>
        </div>
        {discount !== null && discount !== undefined && (
          <div className="flex items-center mx-4 gap-8 dark:text-white">
            <span>{detailorder6}: </span>
            <span className="text-green-700">
              {formatMoney(
                order?.reduce((sum, el) => sum + Number(el.total), 0) *
                (discount / 100)
              )}{" "}
              VND
            </span>
          </div>
        )}
        <div className="flex items-center mx-4 gap-8 font-bold dark:text-white">
          <span> {detailorder7}:</span>
          <span className="text-green-700">
            {formatMoney(
              order?.reduce((sum, el) => sum + Number(el.total), 0) -
              (discount
                ? order?.reduce((sum, el) => sum + Number(el.total), 0) *
                (discount / 100)
                : 0)
            ) + ` VND`}
          </span>
        </div>
        <span className="text-xs italic">
          {detailorder8}
        </span>
        <div className="flex gap-3 ">
          <Button
            // className="bg-main text-white px-4 py-2 rounded-md inline-block"
            handleOnClick={() => {
              navigate(`/${path.HOME}`);
            }}
          >
            {detailorder9}
          </Button>

          <Link
            className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg shadow-rose-700/100 hover:shadow-rose-700/70 text-white px-4 py-2 rounded-md text-center w-[112px] h-[42px] "
            target="_blank"
            to={`/${path.CHECKOUT}`}
            onClick={() => setOrderChanged(true)}
          >
            {detailorder10}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailOrder);
