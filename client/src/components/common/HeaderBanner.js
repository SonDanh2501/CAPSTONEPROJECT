import React, { memo } from "react";
import Button from "components/buttons/Button";
import "./LandingBanner.css";
import icons from "../../ultils/icons";

const { BsReplyFill, FaTty, AiFillGift } = icons;

const HeaderBanner = ({ title, subtitle }) => {
  return (
    <div>
      <div className="w-full h-[1000px]">
        <div className="bg-banner hero-area align-middle items-center flex justify-center">
          <div className="absolute z-10">
            <p className="text-orange text-xl font-bold text-center mb-4">
              {title}
            </p>
            <h1 className="text-6xl text-white text-center">{subtitle} </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderBanner);
