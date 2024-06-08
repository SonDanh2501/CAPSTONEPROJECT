import React, { useState, useEffect, memo } from "react";
import { apiGetAllNews } from "apis";
import CommentSlider from "./CommentSlider";
import { useTranslation } from "react-i18next";
import backgroundImage from "assets/comment_bg.jpg";
const Comments = () => {
    const { t } = useTranslation();
    const { new1, new2, new3 } = t("new1")
    const [news, setNews] = useState(null);
    const fetchNews = async (queries) => {
      const response = await apiGetAllNews(queries);
      if (response.success) {
        setNews(response.news);
      }
    };
    useEffect(() => {
      fetchNews({ sort: "createdAt" });
    }, []);
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className="relative py-10"
      >
        <div class="bg-gray-900 transition duration-300 absolute bottom-0 top-0 right-0 left-0 opacity-75"></div>
        <div className="relative w-full flex flex-col items-center ">
          <div className="text-[50px] font-semibold">
            {/*Header */}
            <span className="text-white">Testimonials</span>
          </div>
          {/*Sub text */}
          <div className="w-full lg:w-[40vw] text-sm pt-2 pb-6 px-4 flex">
            <span className="text-white text-center font-semibold">
              Participating in sports activities will help our body become
              flexible and healthy. Make sure to always maintain regular
              exercise to improve your health
            </span>
          </div>
          {/* News slider*/}
          <CommentSlider news={news} />
          {/* Blank content*/}
          <div className="w-full h-[50px] md:h-[100px]"></div>
        </div>
      </div>
    );
  };

export default memo(Comments);  