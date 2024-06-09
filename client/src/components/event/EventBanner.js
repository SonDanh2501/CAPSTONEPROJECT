import React from "react";
import ball from "../../assets/bg-discount.jpg";
import icons from "ultils/icons";
import { useTranslation } from "react-i18next";
import backgroundImage from "assets/event_banner.jpg";

const { IoArrowForwardOutline } = icons;
const EventBanner = () => {
  const { t } = useTranslation();
  const { event1, event2, event3, event4, event5 } = t("eventbanner");
  return (
    <div className="w-full flex items-center justify-center py-8">
      {/*Image Background*/}
      <div className="w-[90vw] flex justify-end bg-gray-500 p-12">
        <img src={backgroundImage}></img>
        {/*Content*/}
      
      </div>
    </div>
  );
};

export default EventBanner;
