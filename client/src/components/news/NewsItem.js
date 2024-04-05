import React from "react";
import { useNavigate } from "react-router-dom";
const NewsItem = ({ nid, thumb, title, description }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => navigate(`/news/${nid}`)}
      className="bg-gradient-to-r from-gray-900 to-blue-900 w-full h-[600px] border-2 pb-2 cursor-pointer "
    >
      <img src={thumb} alt="thumb" className="object-cover w-full h-5/6" />
      <h1
        className="font-medium w-full flex justify-start text-white hover:text-gray-200 pr-2 pl-4 pt-2 md:text-xl text-md"
        style={{ fontFamily: "Open Sans" }}
      >
        {title}
      </h1>
      <div className=" hidden md:block pb-2 pl-4 pr-4">
        <span className="text-md text-md text-gray-400 ">{description}</span>
      </div>
    </div>
  );
};

export default NewsItem;
