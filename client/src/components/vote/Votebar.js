import React, { useRef, useEffect, memo } from "react";
import icons from "ultils/icons";
import { useTranslation } from "react-i18next";
import { IoStar } from "react-icons/io5";

const { AiFillStar } = icons;
const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const { t } = useTranslation();
  const { rating1 } = t("rating")
  const percentRef = useRef();
  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}% `;
  }, [ratingCount, ratingTotal]);
  return (
    <div className="flex items-center gap-1 text-sm text-black">
      <div className="flex w-[10%] items-center justify-center">
        <span className={`text-sm px-1  ${number === 1 && "pr-2"}`}>{number}</span>
        <span>
          <IoStar color="darkgreen" size={16}/>
        </span>
      </div>
      <div className="w-[80%]">
        <div className="w-full h-[8px] relative bg-gray-300 ">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-button-color "
          ></div>
        </div>
      </div>
      <div className="w-[10%] flex justify-center ">
        <span> {`${ratingCount || 0}`}</span>
      </div>
    </div>
  );
};

export default memo(Votebar);
