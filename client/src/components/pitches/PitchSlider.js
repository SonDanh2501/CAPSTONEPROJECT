import React, { useState, useEffect, memo } from "react";
import NewsCard from "components/news/NewsCard";

import Slider from "react-slick";
import PitchCard from "./PitchCard";

const PitchSlider = ({ pitches }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };
  console.log(pitches)
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
              image_change={el.images[1]}
              title={el.title}
              totalRatings={el.totalRatings}
              price_morning={el.price_morning}
              price_evening={el.price_evening}
              price_afternoon={el.price_afternoon}
              category={el.category}
              brand={el.brand}
              address={el.address[0]}
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
              image_change={el.images[1]}
              title={el.title}
              totalRatings={el.totalRatings}
              price_morning={el.price_morning}
              price_evening={el.price_evening}
              price_afternoon={el.price_afternoon}
              category={el.category}
              brand={el.brand}
              address={el.address[0]}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default memo(PitchSlider);
