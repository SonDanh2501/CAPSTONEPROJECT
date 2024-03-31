import { HeaderBanner } from "components";
import React, { useEffect, useState, useCallback } from "react";
import image1 from "../../assets/banner3.jpg";
import image2 from "../../assets/banner1.jpg";
import image3 from "../../assets/banner2.jpg";
import { InputSelect, Pagination } from "components";
import { apiGetNews } from "apis";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import image from "assets/banner.jpg";
import { FaChevronRight } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";

const options = [
  { value: 1, text: "Newest" },
  { value: 2, text: "Oldest" },
];
const News = () => {
  const [visibleNews, setVisibleNews] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sort, setSort] = useState("");

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  const [news, setNews] = useState(null);

  const fetchNews = async () => {
    const response = await apiGetNews();
    console.log(response);
    if (response.success) {
      setNews(response.news);
      setTotalNews(response.news.length);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (news) {
      setCurrentIndex(0);
    }
  }, [news]);

  useEffect(() => {
    if (news) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalNews);
    }
  }, [news, totalNews]);

  const displayCount = 3;

  useEffect(() => {
    const updateVisibleNews = () => {
      if (news && Array.isArray(news) && totalNews > 0) {
        const endIndex = (currentIndex + displayCount) % totalNews;
        let newsToShow;

        if (endIndex > currentIndex) {
          newsToShow = news.slice(currentIndex, endIndex);
        } else {
          newsToShow = [
            ...news.slice(currentIndex),
            ...news.slice(0, endIndex),
          ];
        }

        if (newsToShow && newsToShow.length > 0) {
          setVisibleNews(newsToShow);
        } else {
          setCurrentIndex(0);
        }
      }
    };

    updateVisibleNews();

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalNews);
    }, 7000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, displayCount, news, totalNews]);

  return (
    <>
      <div className="w-full">
        <div>
          <HeaderBanner title="FOOTBALL INFORMATION" subtitle="NEWS ARTICLE" />
        </div>

        <div className="p-8">
          <div className="flex">
            <div className="md:w-4/5 w-full">
              <div className="flex items-center ">
                <div className="w-full  grid md:grid-cols-3  auto-rows-[300px] gap-2 ">
                  {visibleNews?.map((e, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r from-gray-900 to-blue-900  border-2 pb-2 cursor-pointer ${
                        index === 0 ? "md:col-span-2 md:row-span-2" : ""
                      } }`}
                    >
                      <img
                        src={e?.thumb}
                        alt="thumb"
                        className="object-cover w-full h-5/6"
                      />
                      <h1
                        style={{ fontFamily: "Open Sans" }}
                        className={` font-medium flex justify-center text-white hover:text-gray-200 pr-2 pl-2 ${
                          index === 0 ? "md:text-xl text-md" : "text-md"
                        }`}
                      >
                        {index === 0 && e?.title.length > 220 ? (
                          <>
                            {e?.title.substring(0, 200)}
                            <span>...</span>
                          </>
                        ) : (
                          <>
                            {e?.title.length > 80 ? (
                              <>
                                {e?.title.substring(0, 80)}
                                <span>...</span>
                              </>
                            ) : (
                              e?.title
                            )}
                          </>
                        )}
                      </h1>
                      {index === 0 && (
                        <div className=" hidden md:block pb-2 pl-4 pr-4">
                          <span className="text-md text-md text-gray-400 ">
                            {e?.description}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex mt-8 items-center justify-between mb-2">
                <h1 className=" text-blue-900 font-bold text-2xl ">
                  FEATURE NEWS
                </h1>

                <div className="">
                  <InputSelect
                    changeValue={changeValue}
                    value={sort}
                    options={options}
                  ></InputSelect>
                </div>
              </div>

              <hr className="text-2xl" />

              <div className=" flex flex-col gap-4 mt-4 bg-gray-100">
                {news?.map((e, index) => (
                  <div
                    style={{ fontFamily: "Open Sans" }}
                    key={e.id}
                    className=" w-full cursor-pointer md:flex   "
                  >
                    <div className="md:w-1/3 w-full h-2/3">
                      <img
                        src={e.thumb}
                        alt="thumb"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="md:w-2/3 w-full pl-4 pr-4 pb-2">
                      <h1 className=" font-medium flex text-2xl pt-2">
                        {e.title}
                      </h1>
                      <div className="pt-4">
                        <div className="flex gap-2">
                          <span className="font-thin text-zinc-500 flex justify-center items-center md:mr-3 gap-2 text-sm">
                            <RiAdminFill className="md:w-4 md:h-4 w-3 h-3" />
                            {e.author}
                          </span>
                          <span className="ml-4 text-sm font-thin text-zinc-500 flex justify-center items-center mr-3 gap-2">
                            <MdOutlineUpdate className="w-4 h-4" />
                            {e.postedDate}
                          </span>
                          <span className="ml-4 font-thin text-zinc-500 flex justify-center items-center mr-3 gap-2">
                            <MdRemoveRedEye className="text-md" />
                            {e.views}
                          </span>
                        </div>
                      </div>
                      <div className="mt-8 pb-2 font-medium text-zinc-700 text-md">
                        <span>{e.description}</span>
                        <span className="mr-2 ml-1">...</span>
                        <span className="hover:text-blue-700 hover:underline">
                          Read more
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" flex items-center mt-4  justify-center">
                <Pagination totalCount={20} type="news" />
              </div>
            </div>
            <div className="w-1/5 md:block hidden ">
              <span className="font-bold text-2xl pl-4 text-red-600">
                News of the day
              </span>
              <div className="mt-4 flex flex-col">
                {news?.map((el, index) => (
                  <div
                    key={index}
                    style={{ fontFamily: "Open Sans" }}
                    className="pl-4 pr-2 pb-2 border-b border-[#E3E1DC] cursor-pointer "
                  >
                    <span className="text-md hover:text-blue-400">
                      {el.title}
                    </span>

                    <span className="text-gray-400 italic flex justify-end">
                      {el.postedDate}
                    </span>
                    <span className="underline"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
