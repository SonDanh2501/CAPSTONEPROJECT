import React, { useState, useEffect, memo } from "react";
import { apiGetAllNews } from "apis";
import NewsSlider from "./NewsSlider";
import { useTranslation } from "react-i18next";

const News = () => {
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
    <div className="w-full dark:bg-medium bg-gray-200 pb-10">
      <h3 className="text-[40px] font-semibold py-[15px] text-center">
        <span className="text-indigo-500">{new1}</span>
        <span className="border-b-2 border-indigo-500 dark:text-white"> {new2}</span>
        <span className="dark:text-white">{new3}</span>
      </h3>
      {/* News slider*/}
      <NewsSlider news={news} />
    </div>
  );
};

export default memo(News);
