import React, { memo } from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import icons from "ultils/icons";
import moment from "moment";
import { renderStarFromNumber } from "ultils/helper";
import defaultavatar from "assets/defaultava.png";

const { IoArrowForwardOutline, IoEyeOutline } = icons;

const CommentCard = ({ title, comment, firstname, lastname, role, avatar }) => {
  const navigate = useNavigate();
  return (
    <div className=" bg-white h-[250px]  text-gray-700 md:min-h-[10rem] overflow-hidden">
      {/*Pitch Title*/}
      <div className="flex items-center justify-center px-2 py-2.5 font-bold text-xl text-font-normal">
        {title}
      </div>
      {/*Stars*/}
      <div className="flex justify-center items-center">
        <span className="flex gap-0.5">
          {renderStarFromNumber(5, "green", 12).map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
      </div>
      {/*Comment*/}
      <div className="px-6 py-2.5">
        <span className=" line-clamp-4 text-sm">
          {comment}
        </span>
      </div>
      {/*Avatar*/}
      <div className="flex justify-center">
        <img
          src={avatar || defaultavatar}
          alt="avatar"
          class="relative inline-block h-11 w-11 rounded-full object-cover object-center"
        />
      </div>
      {/*Info*/}
      <div className="flex gap-1 items-center justify-center py-2.5">
        {/*Name*/}
        <span className="text-sm font-bold">{firstname} {lastname}</span>
        {/*Role*/}
        <span className="text-sm font-bold">,{role == 2 ? 'Pitch Owner' : role == 3 ? 'Player' : 'Admin'}</span>
      </div>
    </div>
  );
};

export default CommentCard;
