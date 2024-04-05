import React, { useEffect, useState } from "react";
import { IoPeople, IoCart, IoFootballOutline } from "react-icons/io5";
import { apiGetPitches, apiGetUsers, apiGetAllOrder, apiGetOrderByAdmin } from "apis";
import { BoxWrapper } from "ultils/helper";
import { formatMoney, formatPrice } from "ultils/helper";

const NewDashBoard = () => {
  const [pitches, setPitches] = useState(null);
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [profit, setProfit] = useState(null)

  const fetchOrderData = async () => {
    const response = await apiGetOrderByAdmin();
    if (response.success) {
      setProfit(response.allOrder);
    }
  };

  const fetchProducts = async () => {
    const response = await apiGetPitches();
    if (response.success) setPitches(response);
  };
  const fetchUsers = async () => {
    const response = await apiGetUsers();
    if (response.success) setUser(response);
  };
  const fetchOrders = async () => {
    const response = await apiGetAllOrder();
    if (response.success) setOrder(response);
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
    fetchOrderData();
  }, []);
  return (
    <div className="flex gap-4 pt-4">
      <div className="w-44 h-36 bg-white flex flex-col justify-center items-center rounded-md shadow-md gap-2">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-io1">
          <IoFootballOutline className="text-3xl text-sky-500" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <strong className="text-xl text-black font-semibold">
            {pitches?.totalCount}
          </strong>
          <span className="text-sm text-gray-500">Total Pitch</span>
        </div>
      </div>
      <div className="w-44 h-36 bg-white flex flex-col justify-center items-center rounded-md shadow-md gap-2">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-io2">
          <IoPeople className="text-3xl text-violet-500" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <strong className="text-xl text-black font-semibold">
            {user?.counts}
          </strong>
          <span className="text-sm text-gray-500">Total User</span>
        </div>
      </div>
      <div className="w-44 h-36 bg-white flex flex-col justify-center items-center rounded-md shadow-md gap-2">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-io3">
          <IoCart className="text-3xl text-emerald-500" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <strong className="text-xl text-black font-semibold">
            {order?.totalCount}
          </strong>
          <span className="text-sm text-gray-500">Total Orders</span>
        </div>
      </div>
      <div className="w-44 h-36 bg-white flex flex-col justify-center items-center rounded-md shadow-md gap-2">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-io4">
          <IoFootballOutline className="text-3xl text-rose-500" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <strong className="text-xl text-black font-semibold">
            {formatMoney(
              formatPrice(
                profit?.reduce((sum, el) => sum + Number(el.total), 0)
              )
            ) + "   VND"}
          </strong>
          <span className="text-sm text-gray-500">Total Profit</span>
        </div>
      </div>
    </div>
  );
};

export default NewDashBoard;
