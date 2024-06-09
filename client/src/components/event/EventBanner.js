import React, { useState } from "react";
import ball from "../../assets/bg-discount.jpg";
import icons from "ultils/icons";
import { useTranslation } from "react-i18next";
import backgroundImage from "assets/event_banner.jpg";

const { IoArrowForwardOutline } = icons;
const EventBanner = () => {
  const [hoverZoom, setHoverZoom] = useState(false);
  const { t } = useTranslation();
  const { event1, event2, event3, event4, event5 } = t("eventbanner");
  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="overflow-hidden inline-block relative">
        <img
          onMouseEnter={() => setHoverZoom(true)}
          onMouseLeave={() => setHoverZoom(false)}
          className={`w-[90vw] ${hoverZoom &&
            "scale-125"} duration-1000 transition-transform`}
          src={backgroundImage}
        ></img>
        {/*Content*/}
        <div
          onMouseEnter={() => setHoverZoom(true)}
          onMouseLeave={() => setHoverZoom(false)}
          className="absolute top-20 -right-0 flex flex-col py-8 px-12 mr-10 bg-button-color opacity-90"
        >
          {/* <div class="bg-gray-900 absolute bottom-0 top-0 right-0 left-0 opacity-75"></div> */}
          <div className="relative ">
            {/*Reason Sale Off*/}
            <div className="flex justify-end py-1">
              <span className="font-bold text-sm text-white">SEASONAL OFF</span>
            </div>
            {/*Coupon*/}
            <div className="flex justify-end py-1">
              <span className="font-bold text-[35px] text-white">
                20% Off This Weekend
              </span>
            </div>
            {/*How to apply*/}
            <div className="flex w-[35vw] justify-end py-1">
              <span className="text-right text-white">
                Receive 20% off on everything in-store, when you spend over
                $100. Discounts Applied automatically at checkout.
              </span>
            </div>
            {/*Button navigate -> Pitches page*/}
            <div className="flex justify-end py-1">
              <button className="flex items-center justify-center gap-2 px-8 py-3 relative overflow-hidden bg-white text-black transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-emerald-800 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full">
                <span className="relative uppercase text-sm">VIEW MORE</span>
                <span className="relative">
                  <IoArrowForwardOutline />
                </span>
              </button>
            </div>
          </div>
        </div>
        {/*Image Background*/}
        {/* <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "contain",
          }}
          className="w-[90vw] flex justify-end p-12 hover:scale-110 duration-500 transition-transform"
        >
        </div> */}
      </div>
    </div>
  );
};

export default EventBanner;
