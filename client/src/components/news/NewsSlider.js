import React, { useState, useEffect, memo } from "react";
import NewsCard from "components/news/NewsCard";

import Slider from "react-slick";

const NewsSlider = ({ news }) => {
  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: false,
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
    <>
      {/* News slider for full screen*/}
      <div className="md:w-[90vw] md:m-auto hidden md:block">
        <Slider className="custom-slider" {...settings}>
          {news?.map((el) => (
            <NewsCard
              key={el._id}
              nid={el._id}
              title={el.title}
              views={el.views}
              thumb={el.thumb}
              postedDate={el.postedDate}
              description={el.description}
            />
          ))}
        </Slider>
      </div>
      {/* News slider for responsive (mobile screen)*/}
      <div className="w-[90vw] m-auto md:hidden ">
        <Slider className="" {...settings}>
          {news?.map((el) => (
            <NewsCard
              key={el._id}
              nid={el._id}
              title={el.title}
              views={el.views}
              thumb={el.thumb}
              postedDate={el.postedDate}
              description={el.description}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default NewsSlider;
