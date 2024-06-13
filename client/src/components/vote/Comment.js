import React, { memo } from "react";
import avatar from "assets/defaultava.png";
import moment from "moment";
import { renderStarFromNumber } from "ultils/helper";
import { useTranslation } from "react-i18next";


const Comment = ({
  image = avatar,
  name = "Anonymous",
  updatedAt,
  comment,
  star,
}) => {
  const { t } = useTranslation();
  const { rating4, rating5 } = t("rating")

  return (
    <div className="w-full">
      <div className="flex flex-col flex-auto mx-6">
        <div className="flex gap-2">
          <img
            src={image}
            alt="avatar"
            className="w-[25px] h-[25px] object-cover rounded-full"
          ></img>
          <div className="flex w-full justify-between items-center">
            <h3 className="font-semibold">{name}</h3>
            <span className="text-xs italic">
              {moment(updatedAt)?.fromNow()}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-2 px-4 text-sm my-2 border border-gray-300 bg-gray-100">
          <span className="flex items-center gap-1">
            <span className="font-semibold">{rating4}:</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(star)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
          </span>
          <span className="flex gap-1">
            <span className="font-semibold">{rating5}:</span>
            <span className="flex items-center gap-1">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
