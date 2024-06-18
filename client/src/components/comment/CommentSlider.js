import React, { useState, useEffect, memo } from "react";
import CommentCard from "components/comment/CommentCard";
import Slider from "react-slick";
const CommentSlider = ({ news }) => {
  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 850,
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
        },
      },
    ],
  };
  return (
    <>
      {/* News slider for full screen*/}
      <div className="md:w-[91vw] md:m-auto hidden md:block">
        <Slider className="custom-slider" {...settings}>
          {news?.map((el) => (
            <CommentCard
              title={el.title}
              comment={el.ratings[0]?.comment}
              firstname={el.ratings[0]?.postedBy?.firstname}
              lastname={el.ratings[0]?.postedBy?.lastname}
              role={el.ratings[0]?.postedBy?.role}
              avatar={el.ratings[0]?.postedBy?.avatar}
            />
          ))}
        </Slider>
      </div>
      {/*News slider for responsive (mobile screen)*/}
      <div className="w-5/6 m-auto md:hidden ">
        <Slider className="" {...settings}>
          {news?.map((el) => (
            <CommentCard
              title={el.title}
              comment={el.ratings[0]?.comment}
              firstname={el.ratings[0]?.postedBy?.firstname}
              lastname={el.ratings[0]?.postedBy?.lastname}
              role={el.ratings[0]?.postedBy?.role}
              avatar={el.ratings[0]?.postedBy?.avatar}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};


export default CommentSlider