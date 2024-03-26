import React from "react";
import ball from "../../assets/bg-discount.jpg";
import icons from "ultils/icons";
const { FaArrowRight } = icons;
const EventBanner = () => {
  return (
    <div className="w-full h-[553px] bg-white flex items-center justify-center dark:bg-medium">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center md:items-start pt-8 px-4 gap-2 w-">
          <img src={ball} alt="" className="w-full h-[200px] object-cover" />
        </div>

        <div className="px-4 mt-4">
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold py-2 md:py-5">
              <span className="text-indigo-500 font-bold">BIG SALE</span>
            </h1>
            <p className="text-sm md:text-base dark:text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-lg text-black dark:text-white">Up to</span>
              <span className="text-4xl text-yellow-400">50%</span>
              <span className="text-lg text-black dark:text-white">off</span>
            </div>
            <button className="text-white mt-2 flex flex-grow items-center justify-center gap-2 px-2 py-2 rounded-3xl relative overflow-hidden bg-gray-800 shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:text-white hover:shadow-blue-400 hover:before:left-0 hover:before:w-full">
              <span className="relative">Book now</span>
              <span className="relative">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
