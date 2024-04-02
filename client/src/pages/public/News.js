import { HeaderBanner } from "components";
import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import moment from "moment";
import { InputSelect, Pagination, NewsCarousel } from "components";
import { apiGetNews } from "apis";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";

const options = [
  { id: 1, value: "-createdAt", text: "Newest" },
  { id: 2, value: "createdAt", text: "Oldest" },
];
const News = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [news, setNews] = useState(null);
  const [sort, setSort] = useState("");
  const fetchNews = async (queries) => {
    const response = await apiGetNews(queries);
    if (response.success) {
      setNews(response);
    }
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    const q = { queries };
    fetchNews(q);
    // window.scrollTo(0, 0);
  }, [params]);
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  console.log(news);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    delete queries?.sort;
    if (sort) {
      navigate({
        pathname: `/news`,
        search: createSearchParams({ sort, ...queries }).toString(),
      });
    }
  }, [sort]);
  return (
    <>
      <div className="w-full">
        <div>
          <HeaderBanner title="FOOTBALL INFORMATION" subtitle="NEWS ARTICLE" />
        </div>

        <div className="p-8">
          <div className="flex">
            <div className="md:w-4/5 w-full">
              <div className=" items-center w-full ">
                <NewsCarousel data={news?.news} />
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
                {news?.news?.map((e, index) => (
                  <div
                    style={{ fontFamily: "Open Sans" }}
                    key={e.id}
                    className=" w-full cursor-pointer md:flex   "
                    onClick={(e) => navigate(`/news/${e.id}`)}
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
                            {moment(e.postedDate).format("DD/MM/YYYY")}
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
                <Pagination totalCount={news?.totalCount} type="news" />
              </div>
            </div>
            <div className="w-1/5 md:block hidden ">
              <span className="font-bold text-2xl pl-4 text-red-600">
                News of the day
              </span>
              <div className="mt-4 flex flex-col pl-2">
                {news?.news?.map((el, index) => (
                  <div
                    key={el.title}
                    style={{ fontFamily: "Open Sans" }}
                    className="pl-4 pr-2 pb-2 border-b border-[#E3E1DC] cursor-pointer "
                    onClick={(e) => navigate(`/news/${el.id}`)}
                  >
                    <span className="text-md hover:text-blue-400">
                      {el.title}
                    </span>

                    <span className="text-gray-400 italic flex justify-end">
                      {moment(el.postedDate).format("DD/MM/YYYY")}
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
