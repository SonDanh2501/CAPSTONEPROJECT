import React, { useState, useEffect, memo } from "react";
import NewsCard from "components/news/NewsCard";

import Slider from "react-slick";
import PitchCard from "./PitchCard";

const PitchSlider = ({ pitches }) => {
  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      {/* News slider for full screen*/}
      <div className="md:w-[90vw] md:m-auto hidden md:block">
        <Slider className="custom-slider" {...settings}>
          {pitches?.map((el) => (
            <PitchCard
              key={el._id}
              pid={el._id}
              image={el.images[0]}
              title={el.title}
              totalRatings={el.totalRatings}
              price_morning={el.price_morning}
              price_evening={el.price_evening}
              price_afternoon={el.price_afternoon}
              category={el.category}
              brand={el.brand}
            />
          ))}
        </Slider>
      </div>
      {/* News slider for responsive (mobile screen)*/}
      <div className="w-[90vw] m-auto md:hidden ">
        <Slider className="" {...settings}>
          {pitches?.map((el) => (
            <PitchCard
              key={el._id}
              pid={el._id}
              image={el.images[0]}
              title={el.title}
              totalRatings={el.totalRatings}
              price_morning={el.price_morning}
              price_evening={el.price_evening}
              price_afternoon={el.price_afternoon}
              category={el.category}
              brand={el.brand}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default memo(PitchSlider);
