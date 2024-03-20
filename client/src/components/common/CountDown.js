import React, { memo } from "react";

const CountDown = ({ unit, number }) => {
  return (
    <div className="w-[80px] h-[70px] flex justify-center items-center bg-gray-100 flex-col border-2 border-indigo-500 ">
      <span className="text-2xl text-indigo-500">{number}</span>
      <span className="text-md text-gray-700">{unit}</span>
    </div>
  );
};

export default memo(CountDown);
