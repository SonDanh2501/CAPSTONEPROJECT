import {
  Piechart,
  NewDashBoard,
  Barchart,
  AreaChartMonth,
  ChartPrice,
  PiechartCategory,
} from "components";
import { formatMoney, formatPrice } from "ultils/helper";
import React, { useEffect, useState } from "react";
import { apiGetOrderByAdmin, apiGetAllBrands } from "apis";
import { useOutletContext } from "react-router-dom";
import Toprating from "components/chart/TopRatings";

const Dashboard = () => {
  const [open, setOpen] = useOutletContext();
  const [order, setOrder] = useState(null);
  const [brand, setBrand] = useState(null);

  const fetchOrderData = async () => {
    const response = await apiGetOrderByAdmin();
    if (response.success) {
      setOrder(response.allOrder);
    }
  };

  const fetchBrandDate = async () => {
    const response = await apiGetAllBrands({ limit: 9999 });
    if (response.success) {
      setBrand(response);
    }
  };

  useEffect(() => {
    fetchOrderData();
    fetchBrandDate();
  }, []);

  return (
    <div className={`${open ? "w-[81vw]" : "w-[93vw]"} bg-dash-board pl-4`}>
      <div className="w-full ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Dash Board</h1>
      </div>
      <div className="w-[1260px]">
        <div className="flex items-center gap-2 py-2">
          <div>
            <NewDashBoard />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="flex-1 bg-white">
            <Piechart />
          </div>
          <div className="flex-1 bg-white">
            <PiechartCategory />
          </div>
        </div>
        <div>
          <Toprating></Toprating>
        </div>
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="flex-1 bg-white">
            <AreaChartMonth order={order} />
          </div>
          <div className="flex-1 bg-white">
            <ChartPrice order={order} />
          </div>
        </div>
        <div className="flex items-center py-2">
          <div className=" bg-white">
            <Barchart brand={brand} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
