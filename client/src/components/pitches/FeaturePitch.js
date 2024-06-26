import React, { useState, useEffect, memo } from "react";
import PitchCard from "components/pitches/PitchCard";
import { apiGetPitches } from "apis";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import PitchSlider from "./PitchSlider";

const FeaturePitch = () => {
  const { t } = useTranslation();
  const { feat1, feat2, feat3 } = t("featurepitch")
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
    <div className="w-full flex flex-col items-center dark:bg-gray-700">
      <div className="text-3xl md:text-[50px] font-semibold text-center">
        {/*Header */}
        <span className=" text-font-normal">{feat1}</span>
      </div>
      {/*Sub text */}
      <div className="w-full lg:w-[40vw] text-sm py-6 px-4 flex">
        <span className="text-font-normal text-center">
          {feat2}
        </span>
      </div>
      {/* News slider*/}
      <PitchSlider pitches={pitches} />
    </div>
  );
};

export default memo(FeaturePitch);
