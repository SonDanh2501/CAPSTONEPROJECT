import React, { useRef, useEffect, memo } from "react";
import icons from "ultils/icons";
import { useTranslation } from "react-i18next";

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
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="w-[75%]">
        <div className="w-full h-[8px] relative bg-gray-200 rounded-full">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-red-500 rounded-full"
          ></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end text-xs text-400">{`${ratingCount || 0
        } ${rating1}`}</div>
    </div>
  );
};

export default memo(Votebar);
