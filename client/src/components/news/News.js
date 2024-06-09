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
    <div className="w-full flex flex-col items-center">
      <div className="text-3xl md:text-[50px] font-semibold text-center">
        {/*Header */}
        <span className=" text-font-normal">
          Stay on For Updates
        </span>
      </div>
      {/*Sub text */}
      <div className="w-full lg:w-[40vw] text-sm py-6 px-4 flex">
        <span className="text-font-normal text-center">
          Imagination reigns supreme in this realm, with designers pushing the
          boundaries of innovation to create breathtaking masterpieces
        </span>
      </div>
      {/* News slider*/}
      <NewsSlider news={news} />
    </div>
  );
};

export default memo(News);
