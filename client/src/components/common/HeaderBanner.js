import React, { memo } from "react";
import Button from "components/buttons/Button";
import "./LandingBanner.css";
import icons from "../../ultils/icons";
import { useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const { BsReplyFill, FaTty, AiFillGift } = icons;

const HeaderBanner = ({ title, subtitle }) => {
  const { linkto } = useParams();

  return (
    <div>
      <div className="w-full h-[250px]">
        <div className="bg-banner hero-area align-middle items-center flex justify-center">
          <div className="absolute z-10">
            <div className="w-full px-4 text-white text-lg flex items-center justify-center">
              <Breadcrumb title={linkto} size="text-lg" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[50px] text-green-500 text-center font-bold leading-tight	">
                {subtitle}
              </span>
              <span className="w-1/2 text-white text-center text-xs pt-2">
                Our love for football is not just a hobby but a lifestyle. We
                are a community of individuals passionate about fostering deeper
                connections with each other through playing football together.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderBanner);
