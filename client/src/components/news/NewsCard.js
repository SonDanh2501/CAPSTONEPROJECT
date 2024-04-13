import React, { memo } from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const NewsCard = ({ nid, title, views, thumb, postedDate, description }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r h-[600px] from-white to-gray-100 text-gray-700 cursor-pointer  md:min-h-[10rem] ] shadow-lg rounded-md overflow-hidden border-2  hover:opacity-75 ">
      {/* News thumbs*/}
      <img
        src={thumb}
        alt="news image"
        className="w-full h-[250px] object-cover "
      />
      <div className="ml-3 mt-4 mr-3">
        {/* News title*/}
        <span className="font-semibold text-xl text-black flex items-center justify-center mt-2 mb-2">
          {title}
        </span>
        <div className="flex gap-2 ">
          {/* News posted date*/}
          <span className=" font-thin text-zinc-500 flex md:justify-center items-center mr-3 gap-2  ">
            <MdOutlineUpdate className="w-4 h-4" />
            {moment(postedDate).format("DD/MM/YYYY")}
          </span>
          {/* News number of views*/}
          <span className=" font-thin text-zinc-500 flex md:justify-center items-center mr-3 gap-2">
            <MdRemoveRedEye className="text-md" />
            {views}
          </span>
        </div>
        {/* News description*/}
        <div className="mt-4">
          <span>{description}</span>
        </div>
      </div>
      {/* Button read more*/}
      <a
        onClick={() => navigate(`/news/${nid}`)}
        className=" bottom-0 mt-4 pl-4 flex items-center pb-2  justify-start font-bold text-black  hover:text-blue-800 mb-4 "
      >
        Read more
        <FaChevronRight className="text-sm mt-1 ml-1" />
      </a>
    </div>
  );
};
export default memo(NewsCard);
