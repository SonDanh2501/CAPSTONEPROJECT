import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Barchart = ({ brand }) => {
  return (
    <div>
      <div className="w-full">
        <ResponsiveContainer width={1300} height={400}>
          <BarChart
            width={100}
            height={40}
            data={brand?.Brands}
            margin={{
              top: 20,
              right: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="title"
              style={{
                fontSize: "0.6rem",
              }}
            />
            <YAxis
              dataKey="totalPitch"

            />
            <Bar dataKey={"totalPitch"} fill="#8884d8" />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Barchart;
