import React, { memo, useState } from "react";
import { renderStarFromNumber } from "ultils/helper";
import { apiRatings } from "apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { useNavigate } from "react-router-dom";
import { Button, Votebar, VoteOption, Comment } from "components";
import Swal from "sweetalert2";
import path from "ultils/path";
import { useTranslation } from "react-i18next";

const PitchInformation = ({
  totalRatings,
  ratings,
  namePitch,
  pid,
  rerender,
}) => {
  const { t } = useTranslation();
  const { rating1, rating2, rating3 } = t("rating")

  const [activedTab, setActivedTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const handleSubmitVoteOption = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert("Please vote when click submit");
      return;
    }

    await apiRatings({ star: score, comment, pid, updatedAt: Date.now() });
    dispatch(
      showModal({
        isShowModal: false,
        modalChildren: null,
      })
    );
    rerender();
  };

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to vote",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Oops!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              namePitch={namePitch}
              handleSubmitVoteOption={handleSubmitVoteOption}
            />
          ),
        })
      );
    }
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-2/5 py-2 ">
        {/*Rating Avg and Vote Bar */}
        <div className="flex w-full ">
          {/*Rating Avg*/}
          <div className="w-1/2 flex flex-col items-center justify-center">
            {/*Total Avg*/}
            <div className="flex flex-col items-center justify-center bg-button-color p-4">
              <span className="font-bold text-3xl text-white">{`${totalRatings}`}</span>
              <span className="text-xs font-bold  text-white">Out of 5</span>
            </div>
            <div>
              <span className="flex items-center gap-0.5 mt-2">
                {renderStarFromNumber(totalRatings, "darkgreen")?.map(
                  (el, index) => (
                    <span key={index}>{el}</span>
                  )
                )}
              </span>
            </div>
          </div>
          {/*Vote Bar*/}
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-full">
              {Array.from(Array(5).keys())
                .reverse()
                .map((el) => (
                  <Votebar
                    key={el}
                    number={el + 1}
                    ratingTotal={ratings?.length}
                    ratingCount={
                      ratings?.filter((i) => i.star === el + 1)?.length
                    }
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center justify-center py-4 gap-2">
          <span className="text-sm">Review this pitch </span>
          <button onClick={() => handleVoteNow()}>
            <span className="px-4 py-2 text-white bg-button-color font-bold ">
              Write a Review
            </span>
          </button>
        </div>
      </div>
      {/*Comment*/}
      <div className="w-full flex flex-col h-3/5 mt-4 py-4 border-t gap-2 border-green-700">
        {ratings?.map((el) => (
          <Comment
            key={el._id}
            star={el.star}
            updatedAt={el.updatedAt}
            comment={el.comment}
            name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
          ></Comment>
        ))}
      </div>
    </div>
  );
};

export default memo(PitchInformation);
