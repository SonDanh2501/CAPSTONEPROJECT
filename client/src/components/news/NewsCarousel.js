import React, { memo } from "react";
import Slider from "react-slick";
import { NewsItem } from "components";
const NewsCarousel = ({ data }) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 8000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data?.map((el, item) => (
          <div className="" key={item}>
            <NewsItem
              thumb={el.thumb}
              title={el.title}
              description={el.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(NewsCarousel);
