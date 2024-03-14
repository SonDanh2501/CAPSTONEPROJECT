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
  NewsCard,
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
        <div className="flex flex-col gap-5 w-[30%] flex-auto">
          <Sidebar></Sidebar>
        </div>
      </div>

      <div className="w-full bg-[#E7E4E4] h-full">
        <div className=" bg-red-200 w-main  h-96 ml-12 font-sans font-normal text-base tracking-tighter leading-relaxed text-blue-900 overflow-x-hidden">
          <EventBanner />
        </div>
        <h1 className="text-3xl font-bold flex items-center justify-center mb-4">
          Our news
        </h1>
        <div className="flex items-center justify-center">
          <NewsCard />
        </div>
      </div>
    </>
  );
};

export default Home;
