import React, { useState, useEffect, memo } from "react";
import PitchCard from "components/pitches/PitchCard";
import { apiGetPitches } from "apis";
import Slider from "react-slick";

const FeaturePitch = () => {
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

  const [pitches, setPitches] = useState(null);
  const fetchPitches = async () => {
    const response = await apiGetPitches({
      // limit: 3, // number of pitches maximum to display
      totalRatings: 5,
      page: Math.round(Math.random() * 1),
    });
    if (response.success) setPitches(response.pitches);
  };
  useEffect(() => {
    fetchPitches();
  }, []);

  return (
    <div className="w-full dark:bg-medium pb-10">
      <h3 className="text-[40px] font-semibold py-[15px] text-center">
        <span className="text-indigo-500 ">Our</span>
        <span className="border-b-2 border-indigo-500 dark:text-white">
          {" "}
          Pit
        </span>
        <span className="dark:text-white">ches</span>
      </h3>

      <div className="w-3/4	m-auto">
        <Slider className="custom-slider" {...settings}>
          {pitches?.map((el) => (
            <PitchCard
              key={el._id}
              pid={el._id}
              image={el.images[0]}
              title={el.title}
              totalRatings={el.totalRatings}
              price={el.price}
              category={el.category}
              brand={el.brand}
            ></PitchCard>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default memo(FeaturePitch);
