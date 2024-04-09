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
    <div className={`${open ? "w-[83vw]" : "w-[94vw]"} bg-dash-board pl-4`}>
      <div className="w-full ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Dash Board</h1>
      </div>
      <div className="flex gap-8 pt-2">
        <div>
          <NewDashBoard />
          <div className="flex-1 pl-72 mt-5 bg-white ">
            <AreaChartMonth order={order} />
          </div>
          <div className="flex-1 items-center justify-center pl-72 mt-3 bg-white">
            <ChartPrice order={order} />
          </div>
        </div>
        <div className="w-1/3 justify-center gap-10 py-2">
          <div className=" bg-white mb-5">
            <Piechart />
          </div>
          <div className=" bg-white">
            <PiechartCategory />
          </div>
        </div>
      </div>
      {/* <div className="my-5 pl-48 bg-white">
        <Barchart brand={brand} />
      </div> */}
      {/* <div className="w-full flex items-center justify-center gap-2 py-2">
        <div className="flex-1 bg-white">
          <Piechart />
        </div>
        <div className="flex-1 bg-white">
          <PiechartCategory />
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-2 py-2">
        <div className="flex-1 bg-white">
          <AreaChartMonth order={order} />
        </div>
        <div className="flex-1 bg-white">
          <ChartPrice order={order} />
        </div>
      </div>
      <div className="w-full flex items-center justify-center py-2">
        <div className=" bg-white">
          <Barchart brand={brand} />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
