import React, { memo } from "react";
import Button from "components/buttons/Button";
import "./LandingBanner.css";
import icons from "../../ultils/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed
import path from "ultils/path";

const {
  BsReplyFill,
  BsShieldShaded,
  FaTty,
  AiFillGift,
  IoArrowForwardOutline,
  IoGiftOutline,
  IoHelpBuoyOutline,
  IoLogoDropbox,
  FiBox,
} = icons;

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
  const handleNavigatePitches = () => {
    navigate(`/${path.PITCHES}`);
  };
  return (
    <div>
      <div className="w-full h-[700px]">
        <div className="flex flex-col justify-center bg-banner hero-area">
          <div className="flex flex-col absolute z-10 md:ml-24 ml-5">
            {/*Sub text Header */}
            <span className="text-green-500 font-bold">NEW PITCHES</span>
            {/*Header*/}
            <span className="md:w-3/5 w-full text-[55px] font-bold text-white leading-tight py-2">
              Beautiful Pitches & High Facilities
            </span>
            {/*Sub text after header */}
            <span className="md:w-3/5 w-full text-white text-sm text-left py-2">
              Known as the most famous and popular king sport in the world.
              Soccer players must practice mobility, jogging and increase
              endurance.
            </span>
            {/*Button*/}
            <div className="py-2 flex gap-2">
              {/*Navigate Pitches Page*/}
              <button
                onClick={() => handleNavigatePitches()}
                className="flex items-center justify-center gap-2 py-2.5 px-8 relative overflow-hidden bg-button-color-hover text-black transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-button-color before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
              >
                <span className="relative text-sm font-semibold">Book Now</span>
                <span className="relative ">
                  <IoArrowForwardOutline />
                </span>
              </button>
              {/*Navigate Pitches Page*/}
              <button
                onClick={() => handleNavigatePitches()}
                className="flex items-center justify-center border border-gray-300 hover:border-transparent text-white py-2.5 px-8 bg-transparent hover:bg-gray-300/20 duration-300"
              >
                <span className="relative text-sm font-semibold ">
                  Learn More
                </span>
              </button>
              {/* <Button size={20} handleOnClick={handleNavigatePitches}>
        {landing3}
       </Button> */}
              {/* <Button size={20} handleOnClick={handleButton2}>
        {landing4}
       </Button> */}
            </div>
          </div>
        </div>
      </div>
      {/*Icons*/}
      <div className="flex bg-button-color justify-center items-center py-8">
        {/*Icons Return*/}
        <div className="w-1/3 flex gap-4 items-center justify-center md:ml-20">
          <span className="flex items-center justify-center text-gray-300 hover:rotate-360 duration-45 transition-all">
            <FiBox size={35} />
          </span>
          <div className="flex flex-col text-sm text-gray-500">
            <h3 className="font-bold uppercase text-white py-1 md:text-sm text-xs">RETURN</h3>
            <span className="w-2/3 md:text-xl text-sm font-bold text-white">
              3 Days Free Return
            </span>
          </div>
        </div>
        {/*Icons Help*/}
        <div className="w-1/3 flex gap-4 items-center justify-center md:ml-4">
          <span className="flex items-center justify-center text-gray-300 hover:rotate-360 duration-45 transition-all">
            <IoHelpBuoyOutline size={35} />
          </span>
          <div className="flex flex-col text-sm text-gray-500">
            <h3 className="font-bold uppercase text-white py-1 md:text-sm text-xs">Help</h3>
            <span className="w-2/3 md:text-xl text-sm font-bold text-white">
              24/7 Customer Support
            </span>
          </div>
        </div>
        {/*Icons Gift*/}
        <div className="w-1/3 flex gap-4 items-center justify-center">
          <span className="flex items-center justify-center text-gray-300 hover:rotate-360 duration-45 transition-all">
            <IoGiftOutline size={35} />
          </span>
          <div className="flex flex-col text-sm text-gray-500">
            <h3 className="font-bold uppercase text-white py-1 md:text-sm text-xs">Deal</h3>
            <span className="w-2/3 md:text-xl text-sm font-bold text-white">
              Hot Deal & Coupon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LandingBanner);
