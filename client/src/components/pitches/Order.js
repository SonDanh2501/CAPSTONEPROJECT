import React, { memo, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiDeleteOrder, apiGetUserOrderStatus } from "apis";
import defaultImage from "assets/default.png";
import { shifts } from "ultils/constant";
import { formatMoney } from "ultils/helper";
import { Button } from "components";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import path from "ultils/path";
import { showOrder } from "store/app/appSlice";
const Order = ({click}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current } = useSelector((state) => state.user);
  const [order, setOrder] = useState(null);
  
  const fetchPitchData = async (data) => {
    const response = await apiGetUserOrderStatus(current?._id);
    if (response.success) {
      setOrder(response.Booking);
    }
  };
  const updateOrder = async (bid) => {
    const response = await apiDeleteOrder(bid);
    if (response.success) {
      fetchPitchData();
      toast.success(response.message);
    } else toast.error(response.message);
  };
  useEffect(() => {
    fetchPitchData();
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[420px] h-screen overflow-y-auto bg-white text-black shadow-2xl flex flex-col "
    >
      <div className="p-4 flex justify-between items-center font-bold text-xl border-b-2 border-gray-300">
        <span>Your Order</span>
        <span onClick={() => dispatch(showOrder())} className=" cursor-pointer">
          <IoMdClose />
        </span>
      </div>

      <div className="h-4/6 flex flex-col gap-3 overflow-y-auto py-3">
        {(!order || order.length === 0) && (
          <span className="flex justify-center text-sm italic ">
            Your Order is Empty
          </span>
        )}
        {order &&
          order?.map((el) => (
            <div className="mx-3" key={el._id}>
              <div className="flex justify-between items-center border-b">
                <div className="flex gap-2 p-4 items-center tracking-wide">
                  <img
                    src={el.pitch?.thumb || defaultImage}
                    alt="thumb"
                    className="w-16 h-16 object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="flex gap-1 font-bold text-md">
                        {el.pitch?.title}
                      </span>
                      <span className="text-xs">({el.pitch?.category})</span>
                    </div>
                    <span className="text-xs text-green-600">
                      {shifts.find((s) => s.value === +el.shift)?.time}
                    </span>
                    <button
                      className="w-fit px-2 py-1 my-2 gap-2 flex items-center justify-center cursor-pointer border bg-red-500 rounded-md hover:bg-red-800 duration-300"
                      onClick={() => updateOrder(el._id)}
                    >
                      <span className="text-xs text-white border-r pr-2">
                        Remove
                      </span>
                      <span className="h-5 w-5 flex items-center duration-500 text-white">
                        <MdDeleteForever size={16} />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="font-bold tracking-wider">
                  <span className="text-sm">
                    {formatMoney(el.pitch?.price) + ` VND`}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="h-2/6 flex flex-col justify-between pt-8 border-t-2">
        <div className="flex items-center mx-4 justify-between">
          <span> Subtotal:</span>
          {/* <span>
            {formatMoney(
              order?.reduce((sum, el) => sum + Number(el.pitch?.price), 0)
            ) + ` VND`}
          </span> */}
        </div>
        <div className="flex items-center mx-4 justify-between">
          <span> Discount:</span>
          {/* <span>
            {formatMoney(
              order?.reduce((sum, el) => sum + Number(el.pitch?.price), 0)
            ) + ` VND`}
          </span> */}
        </div>
        <div className="flex items-center mx-4 justify-between font-bold">
          <span> Total:</span>
          {/* <span>
            {formatMoney(
              order?.reduce((sum, el) => sum + Number(el.pitch?.price), 0)
            ) + ` VND`}
          </span> */}
        </div>
        {/* <span className="text-center text-gray-700 italic">
          Taxes and Discount calculated at checkout
        </span> */}
        {/* <Button
          handleOnClick={() => {
            dispatch(showOrder());
            navigate(`${path.DETAIL_ORDER}`);
          }}
          style="rounded-none w-full bg-main py-3"
        >
          Check out Detail
        </Button> */}
        <div className="flex justify-center gap-4 w-full ">
          <button
            onClick={() => {
              dispatch(showOrder());
            }}
            className="my-4 ml-4 py-2 w-1/2 bg-gray-500 rounded-md text-white hover:bg-gray-600 duration-300"
          >
            <span>Continue Shopping</span>
          </button>
          <button
            onClick={() => {
              dispatch(showOrder());
              navigate(`${path.DETAIL_ORDER}`);
            }}
            className="my-4 mr-4 py-2 w-1/2 bg-red-500 rounded-md text-white hover:bg-red-600 duration-300"
          >
            <span>Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Order);
