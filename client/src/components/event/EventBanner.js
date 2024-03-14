import React from "react";
import Button from "@mui/material/Button";
import ball from "../../assets/ball.png";

const EventBanner = () => {
  return (
    <div className="relative ml-2 gap-2">
      <h1 className="text-[50px] text-black font-bold z-10 relative">
        December sale is on!
      </h1>
      <span className="text-3xl text-black font-semibold z-10 relative">
        with big Discount...
      </span>
      <div className="gap-2 relative">
        <span className="text-2xl text-black font-semibold mt-2 z-10 relative">
          Sale!{" "}
        </span>
        <span className="text-4xl text-orange-500 font-bold ml-3 mt-2 z-10 relative">
          50%
        </span>
      </div>

      <button className="rounded-[30px] mt-4 bg-orange-400 font-semibold p-2 text-white hover:bg-blue-950 hover:text-orange-400 z-10 relative">
        Shop now
      </button>
      <img
        src={ball}
        alt="image"
        className="absolute top-0 left-0 w-full  object-cover z-50"
      />
    </div>
  );
};

export default EventBanner;
