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
  Comments,
  EmailSubcribe,
} from "../../components";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import defaultImage from "assets/default.png";
const { IoIosArrowForward, FaPaperPlane } = icons;
const Home = () => {
  const { newPitches } = useSelector((state) => state.pitch);
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="w-full">
      {/* <div className="flex flex-col gap-5 w-[30%] flex-auto">
          <Sidebar></Sidebar>
        </div> */}
      <div className="">
        <LandingBanner />
      </div>
      <div className="w-full py-12">
        <FeaturePitch />
      </div>
      <div className="w-full ">
        <EventBanner />
      </div>
      <div className="w-full ">
        <DealDaily />
      </div>
      <div className="w-full pb-12">
        <Comments />
      </div>
      <div className="w-full py-12">
        <News />
      </div>
      {/*Email subcribe component*/}
      <div className="w-full py-12">
        <EmailSubcribe />
      </div>
    </div>
  );
};

export default Home;
