import React from "react";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import image from "assets/banner.jpg";
import { FaChevronRight } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
const NewsCard = ({
  nid,
  title,
  views,
  image,
  author,
  postedDate,
  subDescription,
}) => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 text-gray-700 w-[330px] min-h-[10rem] shadow-lg rounded-md overflow-hidden border-2  hover:opacity-75">
      <img
        src={image}
        alt="news image"
        className="w-full h-[250px] object-cover "
      />
      <div className="ml-3 mt-4 mr-3">
        <span className="font-semibold text-xl text-black flex items-center justify-center mt-2 mb-2">
          {title}
        </span>
        <div className="flex gap-2">
          <span className="font-thin text-zinc-500 flex justify-center items-center mr-3 gap-2">
            <RiAdminFill className="w-4 h-4" />
            {author}
          </span>
          <span className="ml-4 font-thin text-zinc-500 flex justify-center items-center mr-3 gap-2">
            <MdOutlineUpdate className="w-4 h-4" />
            {postedDate}
          </span>
          <span className="ml-4 font-thin text-zinc-500 flex justify-center items-center mr-3 gap-2">
            <MdRemoveRedEye className="text-md" />
            {views}
          </span>
        </div>
        <div className="mt-4">
          {subDescription.map((el) => (
            <span>{el}</span>
          ))}
        </div>
        <a
          href="/"
          className=" mt-8 flex items-center justify-start font-bold text-black  hover:text-blue-800 mb-4 "
        >
          Read more
          <FaChevronRight className="text-md" />
        </a>
      </div>
    </div>
  );
};
export default NewsCard;
