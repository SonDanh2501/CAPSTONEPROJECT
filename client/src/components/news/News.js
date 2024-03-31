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
      description: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
      ],
    },
    {
      nid: 2,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner4,
      author: "Admin",
      postedDate: "18/03/2024",
      description: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
      ],
    },
    {
      nid: 3,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner5,
      author: "Admin",
      postedDate: "18/03/2024",
      description: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
      ],
    },
    {
      nid: 4,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner6,
      author: "Admin",
      postedDate: "18/03/2024",
      description: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
      ],
    },
    {
      nid: 5,
      title: "Liverpool thiệt hại nặng sau trận thua MU",
      views: 5,
      image: banner4,
      author: "Admin",
      postedDate: "18/03/2024",
      description: [
        "Bây giờ, các cầu thủ sẽ trở về với đội tuyển quốc gia của họ",
        "Chúng tôi hy vọng khi trở lại đây, họ sẽ khỏe mạnh và đầy đủ thể lực",
      ],
    },
  ];
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
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

      <div className="md:w-5/6 md:m-auto hidden md:block">
        <Slider className="custom-slider" {...settings}>
          {data?.map((el) => (
            <NewsCard
              key={el.nid}
              nid={el.nid}
              title={el.title}
              views={el.views}
              image={el.image}
              author={el.author}
              postedDate={el.postedDate}
              description={el.description}
            />
          ))}
        </Slider>
      </div>
      <div className="w-5/6 m-auto md:hidden ">
        <Slider className="" {...settings}>
          {data?.map((el) => (
            <NewsCard
              key={el.nid}
              nid={el.nid}
              title={el.title}
              views={el.views}
              image={el.image}
              author={el.author}
              postedDate={el.postedDate}
              description={el.description}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default memo(News);
