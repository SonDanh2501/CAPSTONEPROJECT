import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiDeleteCoupon, apiGetCouponAdmin, apiGetPitchComment } from "apis";
import { useSelector } from "react-redux";

import defaultt from "assets/default.png";
import moment from "moment";
import icons from "ultils/icons";
import {
    useSearchParams,
    createSearchParams,
    useNavigate,
    useLocation,
    useOutletContext,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatMoney, formatPrice } from "ultils/helper";
// import UpdateBrand from "./UpdateBrand";
import { FaRegEdit } from "react-icons/fa";
const { AiFillStar, MdDeleteForever } = icons;


const Toprating = () => {
    const [pitch, setpitch] = useState(null)
    const [counts, setCounts] = useState(0);
    const fetchPitch = async () => {
        const response = await apiGetPitchComment({
            limit: process.env.REACT_APP_PITCH_LIMIT,
        });
        console.log(response)

        if (response.success) {
            setpitch(response.pitchData);
            setCounts(response.totalCount);
        }
    };
    useEffect(() => {
        fetchPitch();
    }, []);

    return (
        <div>
            <div className="w-full ml-2 py-4 border-gray-300">
                <h1 className="text-2xl font-bold tracking-tight">Top Rating Pitches</h1>
            </div>
            <div className="w-[1270px] p-2">
                <table className="table-auto w-full ">
                    <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-sky-900 text-white py-2">
                            <th className="text-center h-[60px] rounded-tl-lg">#</th>
                            <th className="text-center">Thumb</th>
                            <th className="text-center">Title</th>
                            <th className="text-center">Address</th>
                            <th className="text-center w-40">Category</th>
                            <th className="text-center w-[110px]">Price Morning</th>
                            <th className="text-center w-[110px]">Price Afternoon</th>
                            <th className="text-center w-[110px]">Price Evening</th>
                            <th className="text-center pr-3">Ratings</th>
                            <th className="text-center rounded-tr-lg">Create At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pitch?.map((el, index) => (
                            <tr
                                className='odd:bg-white even:bg-gray-200/50 odd:dark:bg-gray-300 even:dark:bg-white border-b dark:border-gray-700"'
                                key={el._id}
                            >
                                <td className="text-center px-4 py-4">
                                    {(+("page") > 1 ? +("page") - 1 : 0) *
                                        process.env.REACT_APP_PITCH_LIMIT +
                                        index +
                                        1}
                                </td>
                                <td className="text-center px-2 py-2">
                                    <div className="flex items-center justify-center">
                                        {el.thumb ? (
                                            <img
                                                src={el.thumb}
                                                alt="thumb"
                                                className="w-[80px] h-[70px] object-fill rounded-md"
                                            />
                                        ) : (
                                            <img
                                                src={defaultt}
                                                alt="thumb"
                                                className="w-20 h-[70px] object-cover rounded-md"
                                            />
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">{el.title}</td>
                                <td className="px-6 py-5 text-center">
                                    <div className="line-clamp-1" title={el.address}>
                                        {el.address}
                                    </div>
                                </td>
                                <td className="text-center px-2 py-2">
                                    <span
                                        className={`${el?.category === "Sân 5 Người"
                                            ? "text-blue-500 bg-blue-300/25 rounded-md p-2"
                                            : el?.category === "Sân 7 Người"
                                                ? "text-green-500 bg-green-300/25 rounded-md p-2"
                                                : el?.category === "Sân 11 Người"
                                                    ? "text-yellow-500 bg-yellow-300/25 rounded-md p-2"
                                                    : el?.category === "Sân Futsal" &&
                                                    "text-red-500 bg-red-300/25 rounded-md p-2"
                                            }`}
                                    >
                                        {el.category}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {`${formatMoney(formatPrice(el?.price_morning))} `}
                                </td>
                                <td className="text-center">
                                    {`${formatMoney(formatPrice(el?.price_afternoon))} `}
                                </td>
                                <td className="text-center">
                                    {`${formatMoney(formatPrice(el?.price_evening))} `}
                                </td>
                                <td className="text-center">
                                    <div className="flex items-center justify-center ">
                                        {el.totalRatings}
                                        <AiFillStar className="ml-1 text-yellow-500" />
                                    </div>
                                </td>
                                <td className="text-center ">
                                    {moment(el.createdAt).format("DD/MM/YYYY")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Toprating