import React, { memo, useState } from "react";
import { formatMoney } from "ultils/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { DetailPitches } from "pages/public";
import { renderStarFromNumber } from "ultils/helper";
import label from "assets/label.png";
import label2 from "assets/label2.png";
import defaultt from "assets/default.png";
import SelectOption from "components/search/SelectOption";
import icons from "ultils/icons";


const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill, FaArrowRight } = icons;
const Skeleton = () => {
  return (
    <div className=" bg-gradient-to-r from-white to-gray-300 shadow-lg  overflow-hidden hover:shadow-2xl hover:shadow-gray-500 duration-300 hover:bg-gradient-to-l animate-pulse">
      <div className="w-full relative px-3 py-3">
         {/*Image pitches*/}
         <img
          src={ defaultt}
          alt="pitches"
          className="w-full h-[190px] object-cover"
        />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 bg-gray-500 rounded-full mb-4"></div>
        <div className="h-3 bg-gray-500 rounded-full mb-4"></div>
        <div className="h-3 bg-gray-500 rounded-full mb-4"></div>
        <div className="h-3 bg-gray-500 rounded-full mb-4"></div>
      </div>
    </div>
  );
};

export default memo(Skeleton);
