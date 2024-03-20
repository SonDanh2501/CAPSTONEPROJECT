import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "ultils/helper";
import { renderStarFromNumber } from "ultils/helper";
import icons from "ultils/icons";
import SelectOption from "components/search/SelectOption";

const { BsFillSuitHeartFill, AiFillEye, FaArrowRight } = icons;

const PitchCard = ({
  price,
  totalRatings,
  title,
  image,
  pid,
  category,
  brand,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 text-gray-700  min-h-[10rem] shadow-lg rounded-md overflow-hidden border-2 hover:shadow-2xl hover:border-0 hover:shadow-gray-500">
      <img
        src={image}
        alt="pitches"
        className="w-full h-[190px] object-cover "
      />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-gray-300">
            {category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-gray-300">
            {brand}
          </span>
        </div>
        <h2
          className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap"
          title={title}
        >
          {title}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-bold">
            {`${formatMoney(price)} VNĐ`}
          </span>
          <span className="bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white">
            Per Hour
          </span>
        </div>
        <span className="flex gap-1">
          {renderStarFromNumber(totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        <div className="mt-5 flex gap-2">
          <button
            className="
            text-white 
            flex 
            flex-grow 
            items-center 
            justify-center
            gap-2
            px-2 py-2 
            rounded-3xl
            relative overflow-hidden 
          bg-gray-800 
            shadow-lg 
            transition-all 
            before:absolute 
            before:bottom-0 
            before:left-0 
            before:top-0 
            before:z-0 
            before:h-full 
            before:w-0
          before:bg-blue-500 
            before:transition-all 
            before:duration-500 
          hover:text-white 
          hover:shadow-blue-400 
            hover:before:left-0 
            hover:before:w-full"
            onClick={(e) =>
              navigate(
                `/${category.toLowerCase()}/${brand.toLowerCase()}/${pid}/${title}`
              )
            }
          >
            <span className="relative">View details</span>
            <span className="relative">
              <FaArrowRight />
            </span>
          </button>
          <button
            className="relative flex flex-grow items-center justify-center rounded-3xl
            overflow-hidden bg-gray-300 shadow-lg transition-all
            before:absolute 
            before:h-0 
            before:w-0 
            before:rounded-full 
           before:bg-red-500 
           before:duration-500 
           before:ease-out 
           hover:shadow-red-400
           hover:text-white
           hover:before:h-56 
           hover:before:w-56"
          >
            <span className="relative z-10">
              <BsFillSuitHeartFill />
            </span>
          </button>
          <button
            className="relative flex flex-grow items-center justify-center rounded-3xl
            overflow-hidden bg-gray-300 shadow-lg transition-all
            before:absolute 
            before:h-0 
            before:w-0 
            before:rounded-full 
           before:bg-yellow-500 
           before:duration-500 
           before:ease-out 
           hover:shadow-yellow-400
           hover:text-white
           hover:before:h-56 
           hover:before:w-56"
          >
            <span className="relative z-10">
              <AiFillEye />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(PitchCard);
