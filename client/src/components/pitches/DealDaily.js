import React, { useState, useEffect, memo } from "react";
import icons from "ultils/icons";
import { apiGetPitches } from "apis/pitch";
import defaultt from "assets/default.png";
import { formatMoney } from "ultils/helper";
import { renderStarFromNumber } from "ultils/helper";
import CountDown from "components/common/CountDown";
import ImageSlider from "components/common/ImageSlider";

import poster01 from "assets/poster.jpg";
import poster02 from "assets/poster02.jpg";
import poster03 from "assets/poster03.jpg";
import poster04 from "assets/poster04.jpg";
import poster05 from "assets/poster05.jpg";
import poster06 from "assets/poster06.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
const { AiFillStar, AiOutlineMenu, BsCart } = icons;
let idInterval;
const imageArray = [poster01, poster02, poster03, poster04, poster05, poster06];

const DealDaily = () => {
  const { t } = useTranslation();
  const { deal1, deal2, deal3 } = t("dealdaily")
  const navigate = useNavigate();
  const [dealdaily, setDealdaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apiGetPitches({
      limit: 1,
      page: Math.round(Math.random() * 6),
    });
    if (response.success) {
      setDealdaily(response.pitches[0]);
      const h = 24 - new Date().getHours();
      const m = 60 - new Date().getMinutes();
      const s = 60 - new Date().getSeconds();
      setHour(h);
      setMinute(m);
      setSecond(s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  return (
    <div className=" w-full flex flex-col items-center justify-center ">
      {/*Content*/}
      <div className="text-3xl md:text-[50px] font-semibold text-center">
        {/*Header */}
        <span className=" text-font-normal">Hot Deal</span>
      </div>
      {/*Sub text */}
      <div className="w-full lg:w-[40vw] text-sm py-6 px-4 flex">
        <span className="text-font-normal text-center">
          Imagination reigns supreme in this realm, with designers pushing the
          boundaries of innovation to create breathtaking masterpieces
        </span>
      </div>
      {/*Content*/}
      <div className="w-[40vw]">
        <div className="w-full relative overflow-hidden">
          <img src={dealdaily?.thumb || defaultt} alt="" className="" />
          <div class=" absolute h-full w-full bg-black/50 flex items-center justify-center -bottom-20 hover:bottom-0 opacity-0 hover:opacity-100 duration-300 transition-all">
          <span className=" text-lg uppercase font-semibold dark:text-white ">
              {dealdaily?.title}
            </span>          </div>
        </div>
        {/*Clock*/}
        <div className="mx-auto flex w-full max-w-4xl items-center bg-white">
          {/*Hour */}
          <div className="flex h-24 w-1/3 flex-col items-center justify-center gap-1 border-r-[1px] border-slate-200 font-mono md:h-36 md:gap-2">
            <div className="relative w-full overflow-hidden text-center">
              <span className="block text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl">
                {hour}
              </span>
            </div>
            <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">
              Hour
            </span>
          </div>
          {/*Minute */}
          <div className="flex h-24 w-1/3 flex-col items-center justify-center gap-1 border-r-[1px] border-slate-200 font-mono md:h-36 md:gap-2">
            <div className="relative w-full overflow-hidden text-center">
              <span className="block text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl">
                {minute}
              </span>
            </div>
            <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">
              Minute
            </span>
          </div>
          {/*Second */}
          <div className="flex h-24 w-1/3 flex-col items-center justify-center gap-1  border-slate-200 font-mono md:h-36 md:gap-2">
            <div className="relative w-full overflow-hidden text-center">
              <span className="block text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl">
                {second}
              </span>
            </div>
            <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">
              Second
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DealDaily);
