import React, { memo, useState } from "react";
import { formatMoney } from "ultils/helper";
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

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill, FaArrowRight } = icons;
const Pitch = ({ pitchData, isNew, normal, navigate, dispatch, pid }) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
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
      className="bg-gradient-to-r from-white to-gray-200 shadow-lg rounded-md overflow-hidden hover:shadow-2xl hover:shadow-gray-500 duration-300 hover:bg-gradient-to-l"
      onClick={(e) =>
        navigate(
          `/${pitchData?.category?.toLowerCase()}/${pitchData?.brand?.toLowerCase()}/${
            pitchData?._id
          }/${pitchData?.title}`
        )
      }
      onMouseEnter={(e) => {
        e.stopPropagation();
        setIsShowOption(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setIsShowOption(false);
      }}
    >
      <div className="w-full relative px-3 py-3">
        {isShowOption && (
          <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
            <span onClick={(e) => handleClickOptions(e, "QUICK_VIEW")}>
              <SelectOption
                quickview
                icon={<AiFillEye></AiFillEye>}
              ></SelectOption>
            </span>
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
        <img
          src={pitchData?.thumb || defaultt}
          alt="thumb"
          className="w-full h-[190px] object-fill rounded-lg"
        ></img>
      </div>

      <div className="p-5 flex flex-col gap-3">
        {/* <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-gray-300">
            {pitchData?.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-gray-300">
            {pitchData?.brand}
          </span>
        </div> */}
        <h2
          className="font-semibold text-2xl line-clamp-1 text-center"
          title={pitchData?.title}
        >
          {pitchData?.title}
        </h2>
        <div className="flex gap-2 justify-center text-sm">
          <span>{pitchData?.brand},</span>
          <span>{pitchData?.category}</span>
        </div>
        <span className="flex gap-1 justify-center">
          {renderStarFromNumber(pitchData?.totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        <div className="flex items-center justify-center gap-2 mt-1 ">
          <span className="text-xl font-bold ">
            {`${formatMoney(pitchData?.price)} VNĐ`}
          </span>
          <span className="bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white">
            Per Hour
          </span>
        </div>

        <div className="mt-3 flex gap-2 ">
          <button
            className="
            text-white 
            flex 
            flex-grow 
            items-center 
            justify-center
            gap-2
            px-2 py-2 
            rounded-3xl
            relative overflow-hidden 
          bg-gray-800 
            shadow-lg 
            transition-all 
            before:absolute 
            before:bottom-0 
            before:left-0 
            before:top-0 
            before:z-0 
            before:h-full 
            before:w-0
          before:bg-blue-500 
            before:transition-all 
            before:duration-500 
          hover:text-white 
          hover:shadow-blue-400 
            hover:before:left-0 
            hover:before:w-full"
            onClick={(e) =>
              navigate(
                `/${pitchData?.category.toLowerCase()}/${pitchData?.brand.toLowerCase()}/${
                  pitchData?.pid
                }/${pitchData?.title}`
              )
            }
          >
            <span className="relative">View details</span>
            <span className="relative">
              <FaArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Pitch);
