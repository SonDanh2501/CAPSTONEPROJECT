import React, { useState, useEffect, memo } from "react";
import PitchCard from "components/pitches/PitchCard";
import { apiGetPitches } from "apis";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import PitchSlider from "./PitchSlider";

const FeaturePitch = () => {
  const { t } = useTranslation();
  const { feat1, feat2, feat3 } = t("featurepitch")
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    <div className="w-full pb-10">
      <h3 className="text-[40px] font-semibold py-[15px] text-center">
        <span className="text-indigo-500">{feat1}</span>
        <span className="border-b-2 border-indigo-500 dark:text-white">
          {" "}
          {feat2}
        </span>
        <span className="dark:text-white">{feat3}</span>
      </h3>
      {/* News slider*/}
      <PitchSlider pitches={pitches} />
    </div>
  );
};

export default memo(FeaturePitch);
