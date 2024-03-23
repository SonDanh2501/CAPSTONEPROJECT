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
    <div className="flex gap-8 pt-2">
      <div className="">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-io1">
            <IoFootballOutline className="text-2xl text-sky-500" />
          </div>
          <div className="pl-4">
            <span className="text-xl text-black font-semibold">
              Total Pitch
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-black font-semibold">
                {pitches?.totalCount}
              </strong>
            </div>
          </div>
        </BoxWrapper>
      </div>

      <div className="">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-io2">
            <IoPeople className="text-2xl text-violet-500" />
          </div>
          <div className="pl-4">
            <span className="text-xl text-black font-semibold">Total User</span>
            <div className="flex items-center">
              <strong className="text-xl text-black font-semibold">
                {user?.counts}
              </strong>
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div className="">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-io3">
            <IoCart className="text-2xl text-emerald-500" />
          </div>
          <div className="pl-4">
            <span className="text-xl text-black font-semibold">Total Orders</span>
            <div className="flex items-center">
              <strong className="text-xl text-black font-semibold">
                {order?.totalCount}
              </strong>
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div className="">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-io4">
            <IoFootballOutline className="text-2xl text-rose-500" />
          </div>
          <div className="pl-4">
            <span className="text-xl text-black font-semibold">
              Total Profit
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-black font-semibold">
                {formatMoney(
                  formatPrice(profit?.reduce((sum, el) => sum + Number(el.total), 0))
                ) + "VND"}
              </strong>
            </div>
          </div>
        </BoxWrapper>
      </div>

    </div>
  );
};

export default NewDashBoard;
