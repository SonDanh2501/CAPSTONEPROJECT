import { AreaChartMonth, ChartPrice } from "components";
import { formatMoney, formatPrice } from "ultils/helper";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { apiGetAllOrderPitchOwner } from "apis";
import { useOutletContext } from "react-router-dom";

const DashboardOwner = () => {
  const [open, setOpen] = useOutletContext();
  const [order, setOrder] = useState(null);
  const [counts, setCounts] = useState(0);
  const { current } = useSelector((state) => state.user);
  const fetchOrderData = async (params) => {
    const response = await apiGetAllOrderPitchOwner({
      owner: current?._id,
      ...params,
    });
    if (response.success) {
      setOrder(response.Bookings);
      setCounts(response.totalCount);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);
  return (
    <div className={`${open ? "w-[81vw]" : "w-[93vw]"} bg-dash-board pl-4`}>
      <div className="w-full ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Dash Board</h1>
      </div>
      <div className="w-full flex flex-col items-center bg-dash-board ">
        <div className="flex-1 bg-white">
          <AreaChartMonth order={order} />
        </div>
        <div className="flex-1 bg-white mt-5">
          <ChartPrice order={order} />
        </div>
        <div className="mt-5">
          <span>Total Profit: </span>
          <span className="text-main text-3xl font-semibold">
            {formatMoney(
              formatPrice(order?.reduce((sum, el) => sum + Number(el.total), 0))
            ) + "VND"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardOwner;
