import React, { useState, useEffect, memo } from "react";
import PitchCard from "components/pitches/PitchCard";
import { apiGetPitches } from "apis";
import banner3 from "assets/banner3.jpg";
import banner4 from "assets/banner4.jpg";
import banner5 from "assets/banner5.jpg";
import banner6 from "assets/banner6.jpg";

const FeaturePitch = () => {
  const [pitches, setPitches] = useState(null);

  const fetchPitches = async () => {
    const response = await apiGetPitches({
      limit: 3, // number of pitches maximum to display
      totalRatings: 5,
      page: Math.round(Math.random() * 1),
    });
    if (response.success) setPitches(response.pitches);
  };
  useEffect(() => {
    fetchPitches();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-[40px] font-semibold py-[15px] text-center">
        <span className="text-indigo-500">Our</span>
        <span> P</span>
        <span className="border-b-2 border-indigo-500">ro</span>
        <span>ducts</span>
      </h3>
      <div className="flex flex-col lg:flex-row mt-[15px] justify-center items-center gap-20 ">
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
      </div>
      {/* <div className="flex justify-between">
        <img src={banner5} className="w-[40%] h-[380px]"></img>

        <div className="flex flex-col justify-between h-full w-[24%]">
          <img src={banner4} className="w-[100%] object-contain"></img>
          <img
            src={banner3}
            className="w-[100%] h-[210px] object-contain"
          ></img>
        </div>
        <img src={banner6} className="w-[35%] h-[380px]"></img>
      </div> */}
    </div>
  );
};

export default memo(FeaturePitch);
