import React, { useState, useEffect, memo } from "react";
import { apiGetAllNews } from "apis";
import NewsSlider from "./NewsSlider";
const News = () => {
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
    <div className="w-full dark:bg-medium bg-gray-200 pb-10">
      <h3 className="text-[40px] font-semibold py-[15px] text-center">
        <span className="text-indigo-500">Our</span>
        <span className="border-b-2 border-indigo-500 dark:text-white"> N</span>
        <span className="dark:text-white">ews</span>
      </h3>
      {/* News slider*/}
      <NewsSlider news={news} />
    </div>
  );
};

export default memo(News);
