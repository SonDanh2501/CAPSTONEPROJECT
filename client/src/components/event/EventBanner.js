import React, { useState } from "react";
import icons from "ultils/icons";
import { useTranslation } from "react-i18next";
import backgroundImage from "assets/event_banner.jpg";

const { IoArrowForwardOutline } = icons;
const EventBanner = () => {
  const [hoverZoom, setHoverZoom] = useState(false);
  const { t } = useTranslation();
  const { event1, event2, event3, event4, event5 } = t("eventbanner");
  return (
    <div
      style={{
        background: "linear-gradient( #FFFFFF 50%, #EEF1E4 50%)",
      }}
      className="w-full  flex items-center justify-center dark:bg-gray-700"
    >
      <div className="w-[90vw] h-full overflow-hidden relative ">
        <img
          onMouseEnter={() => setHoverZoom(true)}
          onMouseLeave={() => setHoverZoom(false)}
          className={`w-full h-[270px] md:h-full ${hoverZoom &&
            "scale-125"} relative duration-1000 transition-transform object-none md:object-fill`}
          src={backgroundImage}
        ></img>
        <div
          onMouseEnter={() => setHoverZoom(true)}
          onMouseLeave={() => setHoverZoom(false)}
          className="absolute top-0 right-0 in flex flex-col
          xl:px-12 xl:py-10 xl:my-8 xl:mr-12 
          lg:px-12 lg:py-10 lg:my-6 lg:mr-10 
          md:px-10 md:py-6 md:my-4 md:mr-10 
          sm:px-8 sm:py-6 sm:my-8 sm:mx-36 
          px-6 py-4 m-4 
        bg-button-color opacity-90"
        >
          {/* <div class="bg-gray-900 absolute bottom-0 top-0 right-0 left-0 opacity-75"></div> */}
          <div className="relative">
            {/*Reason Sale Off*/}
            <div className="flex sm:justify-start md:justify-end xl:py-3 lg:py-2 md:py-1.5 py-1">
              <span className="font-bold text-sm md:text-sm lg:text-base text-white">
                SEASONAL OFF
              </span>
            </div>
            {/*Coupon*/}
            <div className="flex sm:justify-start md:justify-end xl:py-3 lg:py-2 md:py-1.5 py-1">
              <span className="font-bold text-[25px] lg:text-[35px] xl:text-[40px] text-white">
                20% Off This Weekend
              </span>
            </div>
            {/*How to apply*/}
            <div className="flex md:w-[35vw] sm:w-[full] md:justify-end sm:justify-start xl:py-3 lg:py-2 md:py-1.5 py-1">
              <span className="md:text-right text-white sm:text-xs md:text-xs lg:text-sm xl:text-base">
                Receive 20% off on everything in-store, when you spend over
                $100. Discounts Applied automatically at checkout.
              </span>
            </div>
            {/*Button navigate -> Pitches page*/}
            <div className="flex md:justify-end sm:justify-start xl:py-3 lg:py-2 md:py-1.5 py-2">
              <button className="flex items-center justify-center gap-2 px-3 py-1 xl:px-8 xl:py-3 lg:px-6 lg:py-3 md:px-4 md:py-2 sm:px-2 sm:py-3 relative overflow-hidden bg-white text-black transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-emerald-800 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full">
                <span className="relative uppercase sm:text-xs md:text-sm">
                  VIEW MORE
                </span>
                <span className="relative">
                  <IoArrowForwardOutline />
                </span>
              </button>
            </div>
          </div>
        </div>
        {/*Content*/}
      </div>
    </div>
  );
};

export default EventBanner;
