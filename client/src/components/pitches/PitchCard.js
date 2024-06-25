import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney, formatPrice } from "ultils/helper";
import { renderStarFromNumber } from "ultils/helper";
import icons from "ultils/icons";
import SelectOption from "components/search/SelectOption";
import { useTranslation } from "react-i18next";

const {
  BsFillSuitHeartFill,
  AiFillEye,
  FaArrowRight,
  IoArrowForwardOutline,
  IoEyeOutline,
  IoHeartOutline,
} = icons;

const PitchCard = ({
  price_morning,
  price_afternoon,
  price_evening,
  totalRatings,
  title,
  image,
  image_change,
  pid,
  category,
  brand,
  address,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pitchcard1, pitchcard2 } = t("pitchcard");
  const [isHover, setIsHover] = useState(false);
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
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="my-4 bg-gradient-to-r h-[390px] from-white to-gray-100 text-gray-700 border border-green-700 overflow-hidden hover:shadow-2xl hover:shadow-gray-500 duration-300"
    >
      <div className="relative h-3/5">
        <img
          src={`${isHover ? image_change : image}`}
          alt="pitches"
          className="w-full h-full object-cover"
        />
        {/*Category tag */}
        <div class="absolute bottom-0 top-0 right-0 left-0 ">
          <div class="flex items-center text-xs absolute top-0 left-0 bg-button-color px-3 py-1 text-white mt-3 ml-3 ">
            <span className="font-semibold">{category}</span>
          </div>
        </div>
        {/*Add to cart */}
        <div
          class={`flex flex-col items-center justify-end mb-2 transition duration-500 absolute bottom-0 top-0 right-0 left-0 ${
            isHover ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="flex items-center justify-center w-5/6 gap-2 py-2.5 relative overflow-hidden bg-button-color text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-button-color-hover before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full">
            <span className="relative text-sm font-semibold">Add to Cart</span>
            <span className="relative ">
              <IoArrowForwardOutline />
            </span>
          </button>
        </div>
        {/*Icon */}
        <div
          class={`flex flex-col gap-2 items-center justify-end mb-2 transition duration-500 absolute top-0 right-0 opacity-0  mt-3 mr-3 ${
            isHover ? "opacity-100" : "opacity-0"
          }`}
        >
          {/*Icon Heart*/}
          <button
            className="relative flex flex-grow items-center justify-center px-1 py-1
            overflow-hidden bg-button-color-hover shadow-lg transition-all
            before:absolute 
            before:h-0 
            before:w-0 
            before:rounded-full 
           before:bg-red-500 
           before:duration-500 
           before:ease-out 
          hover:text-white
           hover:before:h-56 
           hover:before:w-56"
          >
            <span className="relative z-10">
              <IoHeartOutline />
            </span>
          </button>
          {/*Icon Eyes*/}
          <button
            className="relative flex flex-grow items-center justify-center px-1 py-1
            overflow-hidden bg-button-color-hover shadow-lg transition-all
            before:absolute 
            before:h-0 
            before:w-0 
            before:rounded-full 
            before:bg-yellow-500 
            before:duration-500 
            before:ease-out 
            hover:text-white
            hover:before:h-56 
            hover:before:w-56"
          >
            <span className="relative z-10">
              <IoEyeOutline />
            </span>
          </button>
        </div>
      </div>
      {/*Content */}
      <div className="h-2/5 py-2 pl-4 pr-2">
        {/*Container for Title and Address */}
        <div className="h-2/3">
          {/*Title */}
          <span
            className="font-bold text-xl text-black line-clamp-1"
            title={title}
          >
            {title}
          </span>
          {/*Address */}
          <span className="mt-2 line-clamp-2">{address}</span>
        </div>
        {/*Container for Rating and PRice */}
        <div className="h-1/3">
          {/*Rating */}
          <span className="flex gap-1">
            {renderStarFromNumber(totalRatings, "darkgreen")?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          {/*Price */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-sm font-bold">
              {getPrice(price_morning, price_afternoon, price_evening)?.price}
            </span>
            <span className="bg-green-400 px-2 py-1 rounded-md text-xs tracking-tighter text-white">
              {pitchcard1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PitchCard);
