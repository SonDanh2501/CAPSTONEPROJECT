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

import Button from "components/buttons/Button";
const { AiFillStar, AiOutlineMenu, BsCart } = icons;
let idInterval;
const imageArray = [poster01, poster02, poster03, poster04, poster05, poster06];

const DealDaily = () => {
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
    <div className=" w-full h-[553px] bg-gray-200 flex items-center justify-center dark:bg-medium">
      <div className="mr-3">
        <img
          src={dealdaily?.thumb || defaultt}
          alt=""
          className="w-[550px] h-[350px] object-fit rounded-2xl"
        ></img>
      </div>
      <div>
        <div className="px-4 mt-4">
          <div className="flex flex-col">
            <h3 className="text-[40px] font-semibold py-[5px] ">
              <span className="text-indigo-500">Deal </span>
              <span className="dark:text-white">of the month</span>
            </h3>
            <span className=" text-lg uppercase font-semibold dark:text-white ">
              {dealdaily?.title}
            </span>
            <span className="py-2 dark:text-white">{dealdaily?.address}</span>
            {/* <span className="flex ">
              {renderStarFromNumber(dealdaily?.totalRatings)?.map(
                (el, index) => (
                  <span key={index}>{el}</span>
                )
              )}
            </span>
            <span>{`${formatMoney(dealdaily?.price)} VNĐ`}</span> */}
          </div>
          <div className="flex gap-1 py-5">
            <CountDown unit={"Hours"} number={hour}></CountDown>
            <CountDown unit={"Minutes"} number={minute}></CountDown>
            <CountDown unit={"Seconds"} number={second}></CountDown>
          </div>
          <button
            className="flex 
            items-center 
          justify-center 
          bg-indigo-500 
          py-3 px-5 
          rounded-3xl 
          gap-2 
          text-white 
          shadow-lg
          shadow-blue-500/50 
          relative  
            overflow-hidden  
            transition-all
            before:absolute 
            before:h-0 
            before:w-0 
            before:rounded-full 
           before:bg-red-500 
           before:duration-500 
           before:ease-out 
           hover:shadow-red-400
           hover:text-white
           hover:before:h-56 
           hover:before:w-56"
          >
            <BsCart className="relative"></BsCart>
            <span className="relative">Check Now</span>
          </button>
          {/* <Button
            type="button"
            handleOnClick={() =>
              navigate(
                `/${dealdaily?.category?.toLowerCase()}/${dealdaily?.brand?.toLowerCase()}/${
                  dealdaily?._id
                }/${dealdaily?.title}`
              )
            }
            style="flex"
          >
            <AiOutlineMenu></AiOutlineMenu>
            <span>Option</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default memo(DealDaily);
