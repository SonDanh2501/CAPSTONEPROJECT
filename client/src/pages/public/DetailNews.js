import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RiAdminFill } from "react-icons/ri";
import moment from "moment";
import { MdOutlineUpdate } from "react-icons/md";

import { MdNavigateNext } from "react-icons/md";
import { apiGetNews, apiGetAllNews } from "apis";
import DOMPurify, { clearConfig } from "dompurify";
const DetailNews = () => {
  const dataNews = [
    {
      id: 1,
      title:
        "Video bóng đá Argentina - El Salvador endis totam vo endis totam ",
    },
    {
      id: 2,
      title: "Video bóng đá Argentina - El Salvador endis totam vo ",
    },
    {
      id: 3,
      title: "Video bóng đá Argentina - El Salvador endis totam vo",
    },
    {
      id: 4,
      title: "Video bóng đá Argentina - El Salvador endis totam vo",
    },
    {
      id: 5,
      title: "Video bóng đá Argentina - El Salvador endis totam vo",
    },
    {
      id: 6,
      title: "Video bóng đá Argentina - El Salvador",
    },
  ];
  const [news, setNews] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [nid, setnid] = useState(null);

  const fetchNewsData = async () => {
    const response = await apiGetNews(nid);
    if (response.success) {
      console.log(response);
      setNews(response.newsData);
    }
  };
  useEffect(() => {
    if (params && params.nid) {
      setnid(params.nid);
    }
  }, [params]);
  useEffect(() => {
    if (nid) {
      fetchNewsData();
      // fetchNews();
    }
    window.scrollTo(0, 0);
  }, [nid]);
  // const fetchNews = async (queries) => {
  //   const response = await apiGetAllNews(queries);
  //   if (response.success) {
  //     setNews(response);
  //   }
  // };

  // useEffect(() => {
  //   const queries = Object.fromEntries([...params]);
  //   const q = { queries };
  //   fetchNews(q);
  //   // window.scrollTo(0, 0);
  // }, [params]);
  return (
    <div className="w-full ">
      <div className="flex justify-center items-center mt-14">
        <div className="w-main flex justify-between">
          <div
            style={{ fontFamily: "Open Sans" }}
            className=" md:w-2/3 pl-1 pr-1 w-full "
          >
            <h1 className="font-bold text-2xl pb-4 pt-4">{news?.title}</h1>
            <img
              src={news?.image}
              alt="image of news"
              className="object-cover w-full "
            />

            <div className="flex-row flex  gap-2 pt-4">
              <span className="font-thin text-zinc-500 flex md:justify-center items-center mr-3 gap-2">
                <RiAdminFill className="w-4 h-4" />
                {news?.author}
              </span>
              {/* <span className="md:ml-4 font-thin text-zinc-500 flex md:justify-center items-center mr-3 gap-2">
                <MdRemoveRedEye className="text-md" />
                594
              </span> */}
              <span className="md:ml-4 font-thin text-zinc-500 flex md:justify-center items-center mr-3 gap-2  ">
                <MdOutlineUpdate className="w-4 h-4" />
                {moment(news?.postedDate).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="pt-2 pr-1 pl-1">
              <span className="text-black text-xl">{news?.description}</span>

              <div className="text-lg pt-4">
                <ul className="list-square text-sm ">
                  {news?.content?.length > 1 &&
                    news?.content?.map((el) => (
                      <li className="leading-6" key={el}>
                        {el}
                      </li>
                    ))}
                  {news?.content?.length === 1 && (
                    <div
                      className="text-lg line-clamp-[15] "
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(news?.content[0]),
                      }}
                    ></div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="md:block hidden w-1/3 pl-4 pr-8 ">
            <div className="flex justify-center items-center flex-col">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <div className="mt-4 flex flex-col">
                {dataNews.map((el, index) => (
                  <div
                    style={{ fontFamily: "Open Sans" }}
                    className="pl-4 pr-2 pb-2 flex gap-2  cursor-pointer "
                  >
                    <MdNavigateNext className="w-6 h-6" />
                    <span className="text-lg hover:text-blue-400">
                      {el.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center pt-14 ">
        <h1 className=" text-2xl font bold">RELATED NEWS</h1>
      </div>
    </div>
  );
};

export default DetailNews;
