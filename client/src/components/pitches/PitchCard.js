import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney, formatPrice } from "ultils/helper";
import { renderStarFromNumber } from "ultils/helper";
import icons from "ultils/icons";
import SelectOption from "components/search/SelectOption";
import { useTranslation } from "react-i18next";

const { BsFillSuitHeartFill, AiFillEye, FaArrowRight } = icons;

const PitchCard = ({
  price_morning,
  price_afternoon,
  price_evening,
  totalRatings,
  title,
  image,
  pid,
  category,
  brand,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pitchcard1, pitchcard2 } = t("pitchcard")

  const getPrice = (price_morning, price_afternoon, price_evening) => {
    if ((price_morning === price_afternoon) === price_evening)
      return { price: `${formatMoney(formatPrice(price_morning))}` };
    const maxPrice = Math.max(price_morning, price_afternoon, price_evening);
    const minPrice = Math.min(price_morning, price_afternoon, price_evening);
    return {
      price: `${formatMoney(formatPrice(minPrice))} - ${formatMoney(
        formatPrice(maxPrice)
      )}`,
    };
  };

  return (
    <div className="my-4 bg-gradient-to-r from-white to-gray-100 text-gray-700 shadow-lg rounded-md overflow-hidden hover:shadow-2xl hover:shadow-gray-500 duration-300">
      <img
        src={image}
        alt="pitches"
        className="w-full h-[190px] object-cover "
      />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-gray-300 whitespace-nowrap">
            {category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-gray-300 whitespace-nowrap">
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
            {getPrice(price_morning, price_afternoon, price_evening)?.price}
          </span>
          <span className="bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white">
            {pitchcard1}
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
            px-1 py-2
            md:px-2
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
            <span className="relative hidden lg:flex">{pitchcard2}
            </span>
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
