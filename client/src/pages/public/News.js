import { HeaderBanner } from "components";
import React, { useEffect, useState, useCallback } from "react";
import image1 from "../../assets/banner3.jpg";
import image2 from "../../assets/banner1.jpg";
import image3 from "../../assets/banner2.jpg";
import { InputSelect, Pagination } from "components";

import { RiAdminFill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import image from "assets/banner.jpg";
import { FaChevronRight } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
const dataTitle = [
  {
    id: 1,
    title: "Video bóng đá Argentina - El Salvador",
  },
  {
    id: 2,
    title: "Video bóng đá Argentina - El Salvador ",
  },
  {
    id: 3,
    title: "Video bóng đá Argentina - El Salvador",
  },
  {
    id: 4,
    title: "Video bóng đá Argentina - El Salvador",
  },
  {
    id: 5,
    title: "Video bóng đá Argentina - El Salvador",
  },
  {
    id: 6,
    title: "Video bóng đá Argentina - El Salvador",
  },
];
const dataNews = [
  {
    id: 1,
    title:
      "Lewandowski được đại gia Ả Rập mời 100 triệu euro/năm, phản ứng ra sao?",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle:
      "f you're developing an application, you'll want t f you're developing an application, you'll want to make su o make suf you're developing an application, you'll want to make su",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
  {
    id: 2,
    title:
      "Báo Anh hé lộ Ten Hag giữ chắc ghế, tỷ phú Anh cấp núi tiền mua sắm",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle: "f you're developing an application",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
  {
    id: 3,
    title:
      "Sao Indonesia nhập tịch tỏa sáng trước ĐT Việt Nam, được khen đủ sức đá cho MU",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle: "f you're developing an application",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
  {
    id: 4,
    title:
      "FIFA ra phán quyết trận Triều Tiên - Nhật Bản: Chủ nhà nguy cơ bị phạt",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle: "f you're developing an application",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
  {
    id: 5,
    title:
      "Video bóng đá Pháp - Đức: Đòn đau giây thứ 7, Mbappe mất hình (Giao hữu)",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle: "f you're developing an application",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
  {
    id: 6,
    title:
      "ĐT Anh lại yếu bóng vía ở trận đấu lớn, dàn sao trẻ ra mắt đội tuyển ấn tượng",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle: "f you're developing an application",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
  {
    id: 7,
    title:
      "Sao MU Mainoo gây sốt ngày ra mắt ĐT Anh, tiếp bước Rooney - Greenwood",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle: "f you're developing an application",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
  {
    id: 8,
    title:
      "LỊCH THI ĐẤU BÓNG ĐÁ HÔM NAY MỚI NHẤT: Nóng bỏng giao hữu các đội tuyển quốc",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle: "f you're developing an application",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
  {
    id: 9,
    title:
      "LỊCH THI ĐẤU BÓNG ĐÁ HÔM NAY MỚI NHẤT: Nóng bỏng giao hữu các đội tuyển quốc",
    images: image1,
    thumb: image2,
    views: 10,
    author: "Admin",
    postedDate: "2024-14-12",
    subtitle: "f you're developing an application",
    description:
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
    content: [
      "f you're developing an application, you'll want to make sure you're testing it under conditions that closely simulate a production environment",
      "In production, you'll have an army of users banging away at your app and filling your database with data, which puts stress on your code. If you're hand-entering data into a test environment one record at a time using the UI, you're never going to build up the volume and variety of data that your app will accumulate in a few days in production. Worse, the data you enter will be biased towards your own usage patterns and won't match real-world usage, leaving important bugs undiscovered.",
    ],
  },
];
const options = [
  { value: 1, text: "Newest" },
  { value: 2, text: "Oldest" },
];
const News = () => {
  const [visibleNews, setVisibleNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sort, setSort] = useState("");
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  // Số lượng dữ liệu hiển thị trong mỗi lần
  const displayCount = 3;

  useEffect(() => {
    // Hàm này sẽ được gọi khi currentIndex hoặc dataNews thay đổi
    const updateVisibleNews = () => {
      const endIndex = currentIndex + displayCount;
      const newsToShow = dataNews.slice(currentIndex, endIndex);
      setVisibleNews(newsToShow);
    };

    updateVisibleNews();
  }, [currentIndex]);

  // Hàm này sẽ được gọi sau một khoảng thời gian nhất định
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + displayCount) % dataNews.length
      );
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

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
                <div className="w-full grid md:grid-cols-3  auto-rows-[250px] gap-2 ">
                  {visibleNews.map((e, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r from-gray-900 to-blue-900  border-2 pb-2 cursor-pointer ${
                        index === 0 ? "md:col-span-2 md:row-span-2" : ""
                      } }`}
                    >
                      <img
                        src={e.thumb}
                        alt="thumb"
                        className="object-cover w-full h-5/6"
                      />
                      <h1
                        style={{ fontFamily: "Open Sans" }}
                        className={` font-medium flex justify-center text-white hover:text-gray-200 pr-2 pl-2 ${
                          index === 0 ? "md:text-xl text-md" : "text-md"
                        }`}
                      >
                        {e.title}
                      </h1>
                      {index === 0 && (
                        <div className=" hidden md:block pb-2 pl-4 pr-4">
                          <span className="text-md text-md text-gray-400 ">
                            {e.subtitle}
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
                <div>
                  <div className=" ">
                    <InputSelect
                      changeValue={changeValue}
                      value={sort}
                      options={options}
                    ></InputSelect>
                  </div>
                </div>
              </div>

              <hr className="text-2xl" />

              <div className=" flex flex-col gap-4 mt-4 bg-gray-100">
                {dataNews.map((e, index) => (
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
                {dataNews.map((el, index) => (
                  <div
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
