import React, { memo } from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import icons from "ultils/icons";
import moment from "moment";
import { renderStarFromNumber } from "ultils/helper";

const { IoArrowForwardOutline, IoEyeOutline } = icons;

const CommentCard = ({}) => {
  const navigate = useNavigate();
  return (
    <div className=" bg-white h-[250px]  text-gray-700 md:min-h-[10rem] overflow-hidden">
      {/*Pitch Title*/}
      <div className="flex items-center justify-center px-2 py-2.5 font-bold text-xl text-font-normal">
        Sân bóng Sư Phạm Kĩ Thuật
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </span>
      </div>
      {/*Avatar*/}
      <div className="flex justify-center">
        <img
          alt="Tania Andrew"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
          class="relative inline-block h-11 w-11 rounded-full object-cover object-center"
        />
      </div>
      {/*Info*/}
      <div className="flex gap-1 items-center justify-center py-2.5">
        {/*Name*/}
        <span className="text-sm font-bold">Jonatan Doe,</span>
        {/*Role*/}
        <span className="text-sm font-bold">Client</span>
      </div>
    </div>
  );
};

export default CommentCard;
