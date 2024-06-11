import React, { memo } from "react";
import Button from "components/buttons/Button";
import "./LandingBanner.css";
import icons from "../../ultils/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed
import path from "ultils/path";

const { BsReplyFill, BsShieldShaded, FaTty, AiFillGift } = icons;

const LandingBanner = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    landing1,
    landing2,
    landing3,
    landing4,
    landing5,
    landing6,
    landing7,
    landing8,
    landing9,
    landing10,
  } = t("landingbanner");
  const handleButton2 = () => {
    navigate(`/${path.CONTACT}`);
  };
  const handleButton1 = () => {
    navigate(`/${path.PITCHES}`);
  };
  return (
    <div>
      <div className="w-full h-[620px]">
        <div className="flex flex-col justify-center bg-banner hero-area">
          <div className="absolute z-10">
            {/*Sub text Header */}
            <span className="text-orange text-xl font-bold mb-4">
              NEW PITCHES
            </span>
            {/*Header*/}
            <span className="text-2xl text-white text-center">
              Quality & Spacious Pitches
            </span>
            {/*Button*/}
            <div className="flex flex-col md:flex-row mt-10 gap-4">
              <Button size={20} handleOnClick={handleButton1}>
                {landing3}
              </Button>
              <Button size={20} handleOnClick={handleButton2}>
                {landing4}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/*Icons Help*/}
      <div className="flex flex-col md:flex-row h-full justify-center gap-20 px-8 bg-slate-200 py-20 ">
        <div className="flex gap-4 items-center">
          <span className="p-2 bg-gray-800 rounded-full flex items-center justify-center text-white">
            <BsReplyFill size={25}></BsReplyFill>
          </span>
          <div className="flex flex-col text-sm text-gray-500 dark:text-white">
            <h3 className="font-bold text-xl">{landing5}</h3>
            <span className="text-sm">{landing6}</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="p-2 bg-gray-800 rounded-full flex items-center justify-center text-white">
            <FaTty size={25}></FaTty>
          </span>
          <div className="flex flex-col text-sm text-gray-500  dark:text-white">
            <h3 className="font-bold text-xl">{landing7}</h3>
            <span className="text-sm">{landing8}</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="p-2 bg-gray-800 rounded-full flex items-center justify-center text-white">
            <AiFillGift size={25}></AiFillGift>
          </span>
          <div className="flex flex-col text-sm text-gray-500  dark:text-white">
            <h3 className="font-bold text-xl">{landing9}</h3>
            <span className="text-sm">{landing10}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LandingBanner);
