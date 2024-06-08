import React, { memo } from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import icons from "ultils/icons";
import moment from "moment";

const { IoArrowForwardOutline,IoEyeOutline  } = icons;
const NewsCard = ({ nid, title, views, thumb, postedDate, description }) => {
  const navigate = useNavigate();
  return (
    <div className=" bg-gradient-to-r from-white to-gray-100 h-[380px] text-gray-700 md:min-h-[10rem] overflow-hidden border shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-2xl duration-300">
      <div className="relative h-1/2">
        {/* News thumbs*/}
        <img
          src={thumb}
          alt="news image"
          className="w-full h-full object-cover "
        />
        <div class="hover:bg-gray-900 transition duration-300 absolute bottom-0 top-0 right-0 left-0 opacity-25"></div>
        <a href="#!">
          <div class="text-sm font-bold absolute top-0 right-0 bg-emerald-900 px-4 py-2 text-white mt-3 mr-3 ">
            {moment(postedDate).format("DD MMMM YYYY")}
          </div>
        </a>
      </div>
      <div className="h-1/2 py-2 pl-4 pr-2">
        <div className="h-2/3">
          {/* News title*/}
          <span
            title={title}
            className="font-semibold text-xl text-black mt-2 mb-2 line-clamp-1"
          >
            {title}
          </span>
          {/* News description*/}
          <div className="mt-2 line-clamp-3">
            <span className="text-sm">{description}</span>
          </div>
        </div>
        <div className="h-1/3 flex">
          {/*Button read more*/}
          <div className="w-1/2 ">
            <a
              onClick={() => navigate(`/news/${nid}`)}
              className=" 
            flex 
            flex-grow 
            rounded
            items-center 
            justify-center
            gap-2
            px-2 py-2
            relative 
            overflow-hidden 
          bg-button-color-hover 
          text-black
            shadow-lg 
            transition-all 
            before:absolute 
            before:bottom-0 
            before:left-0 
            before:top-0 
            before:z-0 
            before:h-full 
            before:w-0
          before:bg-button-color
            before:transition-all 
            before:duration-500 
          hover:text-white 
            hover:before:left-0 
            hover:before:w-full"
            >
              <span className="relative uppercase text-sm">Read more</span>
              <span className="relative">
                <IoArrowForwardOutline />
              </span>
            </a>
          </div>
          {/*View*/}
          <div className="w-1/2 flex justify-end mt-1.5">
            <div className="w-fit h-fit flex items-center border-r-2 border-gray-500 gap-2 px-2">
              {/* News number of views*/}
              <span>
                <IoEyeOutline className="text-md" />
              </span>
              <span>{views}</span>
            </div>
            <div class="flex ml-2">
              <img
                alt="Tania Andrew"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                class="relative inline-block h-7 w-7 rounded-full border-2 border-emerald-900 object-cover object-center hover:z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(NewsCard);
