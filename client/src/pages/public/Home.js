import React from "react";
import {
  Banner,
  Sidebar,
  BestPrice,
  DealDaily,
  FeaturePitch,
  CustomSlider,
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
      {/* <div className="w-main flex"> */}
      {/* <div className="flex flex-col gap-5 w-[30%] flex-auto">
          <Sidebar></Sidebar>
          <DealDaily></DealDaily>
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[70%] flex-auto ">
          <Banner></Banner>
          <BestPrice></BestPrice>
        </div>
      </div>
      <div className="w-main my-8">
        <FeaturePitch></FeaturePitch>
      </div>
      <div className="my-8 w-main">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-blue-700">
          NEW ARRIVALS
        </h3>
        <div className="mt-4 mx-[-10px]">
          <CustomSlider pitches={newPitches}></CustomSlider>
        </div>
      </div>
      <div className="my-8 w-main">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-blue-700">
          HOT PITCHES
        </h3>
        <div className="flex flex-wrap gap-4 mt-4">
          {categories
            ?.filter((el) => el.brands.length > 0)
            .map((el) => (
              <div key={el._id} className="w-[680px]">
                <div className="border flex">
                  <img
                    src={el?.thumb || defaultImage}
                    alt="picture category"
                    className="w-[250px] flex-1 h-[250px] object-cover"
                  />
                  <div className="flex-1 text-black-700">
                    <h4 className="font-semibold uppercase ml-10 mt-3">
                      {el.title}
                    </h4>
                    <ul className="text-sm mt-4 ml-4 ">
                      {el?.brands?.slice(0, 9).map((item, index) => (
                        <span key={index} className="flex gap-1 items-center">
                          <IoIosArrowForward size={14} />
                          <Link
                            to={`/${el.title.toLowerCase()}/${item.toLowerCase()}`}
                          >
                            {item}
                          </Link>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div> */}

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
