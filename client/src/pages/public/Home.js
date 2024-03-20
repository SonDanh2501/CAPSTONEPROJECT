import React from "react";
import {
  Banner,
  Sidebar,
  BestPrice,
  DealDaily,
  FeaturePitch,
  CustomSlider,
  LandingBanner,
  EventBanner,
  News,
} from "../../components";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import defaultImage from "assets/default.png";
const { IoIosArrowForward } = icons;
const Home = () => {
  const { newPitches } = useSelector((state) => state.pitch);
  const { categories } = useSelector((state) => state.app);

  return (
    <>
      <div className="w-full">
        <div>
          <LandingBanner></LandingBanner>
        </div>
        <div className="w-full my-10">
          <FeaturePitch></FeaturePitch>
        </div>
        <div className="w-full my-10">
          <DealDaily></DealDaily>
        </div>
        {/* <div className="flex flex-col gap-5 w-[30%] flex-auto">
          <Sidebar></Sidebar>
        </div> */}
      </div>

      <div className="w-full bg-[#E7E4E4]">
        <div className="  ">
          <EventBanner />
        </div>
        <h3 className="text-[40px] font-semibold py-[15px] text-center">
          <span className="text-indigo-500">Ou</span>
          <span className="border-b-2 text-indigo-500">r</span>
          <span className="border-b-2 border-indigo-500"> N</span>
          <span>ews</span>
        </h3>
        <div className="flex items-center justify-center mb-8 mt-8">
          <News />
        </div>
        <div className="h-[500px]"></div>
      </div>
    </>
  );
};

export default Home;
