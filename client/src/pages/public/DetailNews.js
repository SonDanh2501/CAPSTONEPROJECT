import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { apiGetNews, apiGetAllNews } from "apis";
import DOMPurify, { clearConfig } from "dompurify";
import NewsSlider from "components/news/NewsSlider";




const DetailNews = () => {
  const [news, setNews] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [nid, setnid] = useState(null);
  const [relatedNews, setRelatedNews] = useState(null);
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
      fetchNews();
    }
    window.scrollTo(0, 0);
  }, [nid]);
  const fetchNews = async () => {
    const response = await apiGetAllNews({ sort: "-postedDate" });
    if (response.success) {
      const filteredNews = response.news?.filter((item) => item._id !== nid);
      setRelatedNews(filteredNews);
    }
  };

  return (
    <div className="w-full ">
      <div className="flex justify-center items-center mt-14">
        <div className="w-main flex justify-between">
          <div
            style={{ fontFamily: "Open Sans" }}
            className=" md:w-2/3 pl-1 pr-1 w-full "
          >
            {/* News title*/}
            <h1 className="font-bold text-2xl pb-4 pt-4">{news?.title}</h1>
            {/* News image*/}
            <img
              src={news?.image}
              alt="image of news"
              className="object-cover w-full "
            />

            <div className="flex-row flex  gap-2 pt-4"></div>
            <div className="pt-2 pr-1 pl-1">
              {/* News description*/}
              <span className="text-black font-semibold  text-xl">
                {news?.description}
              </span>
              {/* News content*/}
              <div className="text-lg pt-4">
                <ul className="list-square text-md text-justify ">
                  {news?.content?.length > 1 &&
                    news?.content?.map((el) => (
                      <li className="leading-6" key={el}>
                        {el}
                      </li>
                    ))}
                  {news?.content?.length === 1 && (
                    <div
                      className="text-lg align-center"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(news?.content[0]),
                      }}
                    ></div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* Recent post*/}
          <div className="md:block hidden w-1/3 pl-4 pr-6 h-full ">
            <div className="flex justify-center items-center flex-col">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <div className="mt-4 flex flex-col">
                {relatedNews?.map((el, index) => (
                  <div
                    style={{ fontFamily: "Open Sans" }}
                    className="pl-4 pr-2 pb-6 flex gap-2  cursor-pointer "
                    onClick={(e) => navigate(`/news/${el._id}`)}
                  >
                    <span>
                      <MdNavigateNext className="w-[24px] h-[24px]" />
                    </span>
                    {/* Recent post news title*/}
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
      <div className="flex flex-col justify-center items-center pt-14 pb-8 ">
        <h3 className="text-[40px] font-semibold py-[15px] text-center">
          <span className="text-indigo-500">Relate</span>
          <span className="border-b-2 border-indigo-500 text-indigo-500 dark:text-white">
            d
          </span>
          <span className="border-b-2 border-indigo-500 dark:text-white">
            {" "}
            N
          </span>
          <span className="dark:text-white">ews</span>
        </h3>
        <NewsSlider news={relatedNews} />
      </div>
    </div>
  );
};

export default DetailNews;
