import React, { memo } from "react";
import Pitch from "components/pitches/Pitch";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: false,
  speed: 850,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],  
};

const CustomSlider = ({ pitches, activedTab, normal }) => {
  return (
    <>
      {/* Pitches slider for full screen*/}
      <div className="md:w-[90vw] md:m-auto hidden md:block">
        <Slider className="custom-slider" {...settings}>
          {pitches?.map((el, index) => (
            <Pitch
              key={index}
              pid={el.id}
              pitchData={el}
              isNew={activedTab === 1 ? false : true}
              // normal={normal}
            />
          ))}
        </Slider>
      </div>
      {/* Pitches slider for responsive (mobile screen)*/}
      <div className="w-[90vw] m-auto md:hidden">
        <Slider className="" {...settings}>
          {pitches?.map((el, index) => (
            <Pitch
              key={index}
              pid={el.id}
              pitchData={el}
              isNew={activedTab === 1 ? false : true}
              // normal={normal}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};
export default memo(CustomSlider);
