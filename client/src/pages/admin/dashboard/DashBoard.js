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

const Dashboard = () => {
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
    <div className="w-full bg-dash-board px-4 ">
      <div className="flex justify-center gap-8">
        <div>
          <NewDashBoard />
          <div className="flex-1 mt-5 bg-white">
            <AreaChartMonth order={order} />
          </div>
          <div className="flex-1 mt-3 bg-white">
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
      <div className=" bg-white">
        <Barchart brand={brand} />
      </div>
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
