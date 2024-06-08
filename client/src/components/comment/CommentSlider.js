import React, { useState, useEffect, memo } from "react";
import CommentCard from "components/comment/CommentCard";
import Slider from "react-slick";
const CommentSlider = ({ news }) => {
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
        {/*News slider for responsive (mobile screen)*/}
        <div className="w-5/6 m-auto md:hidden ">
          <Slider className="" {...settings}>
            {news?.map((el) => (
              <CommentCard
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
  

export default CommentSlider