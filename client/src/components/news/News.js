import React, { useState, useEffect, memo } from "react";
import NewsCard from "components/news/NewsCard";
import banner3 from "assets/banner3.jpg";
import banner4 from "assets/banner4.jpg";
import banner5 from "assets/banner5.jpg";
import banner6 from "assets/banner6.jpg";
import Slider from "react-slick";
const News = () => {
  const [news, setNews] = useState(null);
  const data = [
    {
      nid: 1,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner3,
      author: "Admin",
      postedDate: "18/03/2024",
      subDescription: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
        "Luis (Diaz) cảm thấy có vấn đề ở háng, Darwin (Nunez) đau gân khoeo, còn Cody (Gakpo) bị trẹo mắt cá chân.",
      ],
    },
    {
      nid: 2,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner3,
      author: "Admin",
      postedDate: "18/03/2024",
      subDescription: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
        "Luis (Diaz) cảm thấy có vấn đề ở háng, Darwin (Nunez) đau gân khoeo, còn Cody (Gakpo) bị trẹo mắt cá chân.",
      ],
    },
    {
      nid: 3,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner3,
      author: "Admin",
      postedDate: "18/03/2024",
      subDescription: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
        "Luis (Diaz) cảm thấy có vấn đề ở háng, Darwin (Nunez) đau gân khoeo, còn Cody (Gakpo) bị trẹo mắt cá chân.",
      ],
    },
    {
      nid: 4,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner3,
      author: "Admin",
      postedDate: "18/03/2024",
      subDescription: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
        "Luis (Diaz) cảm thấy có vấn đề ở háng, Darwin (Nunez) đau gân khoeo, còn Cody (Gakpo) bị trẹo mắt cá chân.",
      ],
    },
    {
      nid: 5,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner3,
      author: "Admin",
      postedDate: "18/03/2024",
      subDescription: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
        "Luis (Diaz) cảm thấy có vấn đề ở háng, Darwin (Nunez) đau gân khoeo, còn Cody (Gakpo) bị trẹo mắt cá chân.",
      ],
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 800,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <div className="w-full dark:bg-medium bg-gray-200 pb-10">
      <h3 className="text-[40px] font-semibold py-[15px] text-center">
        <span className="text-indigo-500">Our</span>
        <span className="border-b-2 border-indigo-500 dark:text-white"> N</span>
        <span className="dark:text-white">ews</span>
      </h3>
      <div className="md:w-3/4 m-auto w-full">
        <Slider className="custom-slider" {...settings}>
          {data?.map((el) => (
            <NewsCard
              nid={el.nid}
              title={el.title}
              views={el.views}
              image={el.image}
              author={el.author}
              postedDate={el.postedDate}
              subDescription={el.subDescription}
            ></NewsCard>
          ))}
        </Slider>
      </div>
      {/* <div className="flex justify-between">
        <img src={banner5} className="w-[40%] h-[380px]"></img>

        <div className="flex flex-col justify-between h-full w-[24%]">
          <img src={banner4} className="w-[100%] object-contain"></img>
          <img
            src={banner3}
            className="w-[100%] h-[210px] object-contain"
          ></img>
        </div>
        <img src={banner6} className="w-[35%] h-[380px]"></img>
      </div> */}
    </div>
  );
};

export default memo(News);
