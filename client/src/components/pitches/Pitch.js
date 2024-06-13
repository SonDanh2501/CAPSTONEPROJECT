import React, { memo, useState } from "react";
import { formatMoney, formatPrice } from "ultils/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { DetailPitches } from "pages/public";
import { renderStarFromNumber } from "ultils/helper";
import label from "assets/label.png";
import label2 from "assets/label2.png";
import defaultt from "assets/default.png";
import SelectOption from "components/search/SelectOption";
import icons from "ultils/icons";
import { toast } from "react-toastify";
import { apiUpdateWishlist } from "apis";
import { getCurrent } from "store/user/asyncAction";
import { useTranslation } from "react-i18next";

const {
  AiFillEye,
  AiOutlineMenu,
  BsFillSuitHeartFill,
  FaArrowRight,
  IoArrowForwardOutline,
  IoEyeOutline,
  IoHeartOutline,
} = icons;

const Pitch = ({ pitchData, isNew, normal, navigate, dispatch, pid }) => {
  const [isHover, setIsHover] = useState(false);
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const { t } = useTranslation();
  const { pitchcard1, pitchcard2 } = t("pitchcard");

  const getPrice = (price_morning, price_afternoon, price_evening) => {
    if (currentHour >= 4 && currentHour < 11) {
      return { price: price_morning };
    } else if (currentHour >= 11 && currentHour < 16) {
      return { price: price_afternoon };
    } else {
      return { price: price_evening };
    }
  };

  navigate = useNavigate();
  dispatch = useDispatch();
  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === "MENU")
      navigate(
        `/${pitchData?.category?.toLowerCase()}/${pitchData?.brand?.toLowerCase()}/${
          pitchData?._id
        }/${pitchData?.title}`
      );
    if (flag === "QUICK_VIEW") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <DetailPitches
              data={{
                pid: pitchData?._id,
                category: pitchData?.category,
              }}
              isQuickView
            ></DetailPitches>
          ),
        })
      );
    }
    if (flag === "WISHLIST") {
      const response = await apiUpdateWishlist(pid);
      if (response.success) {
        dispatch(getCurrent());
        toast.success(response.message);
      } else toast.error(response.message);
    }
  };
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={(e) =>
        navigate(
          `/${pitchData?.category?.toLowerCase()}/${pitchData?.brand?.toLowerCase()}/${
            pitchData?._id
          }/${pitchData?.title}`
        )
      }
      className="bg-gradient-to-r from-white to-gray-100 text-gray-700 border border-green-700 overflow-hidden hover:shadow-2xl hover:shadow-gray-500 duration-300"
    >
      <div className="relative h-1/2">
        {/*Hover Icon */}
        {isShowOption && (
          <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
            <span onClick={(e) => handleClickOptions(e, "QUICK_VIEW")}></span>
            <span onClick={(e) => handleClickOptions(e, "MENU")}>
              <SelectOption
                detail
                icon={<AiOutlineMenu></AiOutlineMenu>}
              ></SelectOption>
            </span>
            <span onClick={(e) => handleClickOptions(e, "WISHLIST")}>
              <SelectOption
                favorite
                icon={
                  <BsFillSuitHeartFill
                    color={current?.wishlist?.some((i) => i === pid) && "red"}
                  ></BsFillSuitHeartFill>
                }
              ></SelectOption>
            </span>
          </div>
        )}
        {/*Image pitches*/}
        <img
          src={pitchData?.thumb || defaultt}
          alt="pitches"
          className="w-full h-[190px] object-cover"
        />
        {/*Category tag */}
        <div class="absolute bottom-0 top-0 right-0 left-0 ">
          <div class="flex items-center text-xs absolute top-0 left-0 bg-button-color px-3 py-1 text-white mt-3 ml-3 ">
            <span className="font-semibold">{pitchData?.category}</span>
          </div>
        </div>
        {/*Add to cart */}
        <div
          class={`flex flex-col items-center justify-end mb-2 transition duration-500 absolute bottom-0 top-0 right-0 left-0 ${
            isHover ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="flex items-center justify-center w-5/6 gap-2 py-2.5 relative overflow-hidden bg-button-color text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-button-color-hover before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full">
            <span className="relative text-sm font-semibold">Add to Cart</span>
            <span className="relative ">
              <IoArrowForwardOutline />
            </span>
          </button>
        </div>
        {/*Icon */}
        <div
          class={`flex flex-col gap-2 items-center justify-end mb-2 transition duration-500 absolute top-0 right-0 opacity-0  mt-3 mr-3 ${
            isHover ? "opacity-100" : "opacity-0"
          }`}
        >
          {/*Icon Heart*/}
          <button
            className="relative flex flex-grow items-center justify-center px-1 py-1
            overflow-hidden bg-button-color-hover shadow-lg transition-all
            before:absolute 
            before:h-0 
            before:w-0 
            before:rounded-full 
           before:bg-red-500 
           before:duration-500 
           before:ease-out 
          hover:text-white
           hover:before:h-56 
           hover:before:w-56"
          >
            <span className="relative z-10">
              <IoHeartOutline />
            </span>
          </button>
          {/*Icon Eyes*/}
          <button
            className="relative flex flex-grow items-center justify-center px-1 py-1
            overflow-hidden bg-button-color-hover shadow-lg transition-all
            before:absolute 
            before:h-0 
            before:w-0 
            before:rounded-full 
            before:bg-yellow-500 
            before:duration-500 
            before:ease-out 
            hover:text-white
            hover:before:h-56 
            hover:before:w-56"
          >
            <span className="relative z-10">
              <IoEyeOutline />
            </span>
          </button>
        </div>
      </div>
      {/*Content */}
      <div className="p-4 flex flex-col gap-3">
        <h2
          className="font-semibold text-2xl line-clamp-1"
          title={pitchData?.title}
        >
          {pitchData?.title}
        </h2>
        {/*Address */}
        <span className="font-bold text-sm line-clamp-2">
          {pitchData?.address}
        </span>
        {/*Rating */}
        <span className="flex gap-1">
          {renderStarFromNumber(pitchData?.totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        {/*Price */}
        <div className="flex items-center gap-3">
          <span className="text-base font-bold">
            {`${formatMoney(
              formatPrice(
                getPrice(
                  pitchData?.price_morning,
                  pitchData?.price_afternoon,
                  pitchData?.price_evening
                )?.price
              )
            )} VNĐ`}{" "}
          </span>
          <span className="bg-green-400 px-2 py-1 text-sm rounded-md tracking-tighter text-white">
            {pitchcard1}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Pitch);
