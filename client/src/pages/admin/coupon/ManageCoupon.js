import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiDeleteCoupon, apiGetCouponAdmin } from "apis";
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
// import UpdateBrand from "./UpdateBrand";
import { FaRegEdit } from "react-icons/fa";
import UpdateCoupon from "./UpdateCoupon";
const { AiFillStar, MdDeleteForever } = icons;


const ManageCoupon = () => {
    const [open, setOpen] = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const {
        register,
        formState: { errors },
        watch,
    } = useForm();
    const [coupon, setCoupon] = useState(null);
    const [counts, setCounts] = useState(0);
    const [editCoupon, setEditCoupon] = useState(null);
    const [update, setUpdate] = useState(false);

    const render = useCallback(() => {
        setUpdate(!update);
    });
    const fetchFAQ = async (params) => {
        const response = await apiGetCouponAdmin({
            ...params,
            limit: process.env.REACT_APP_PITCH_LIMIT,
        });
        console.log(response)

        if (response.success) {
            setCoupon(response.coupon);
            setCounts(response.totalCount);
        }
    };

    const queryDebounce = useDebounce(watch("q"), 800);

    useEffect(() => {
        if (queryDebounce) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({ q: queryDebounce }).toString(),
            });
        } else {
            navigate({
                pathname: location.pathname,
            });
        }
    }, [queryDebounce]);

    useEffect(() => {
        const searchParams = Object.fromEntries([...params]);
        fetchFAQ(searchParams);
    }, [params, update]);

    const handleDeleteCoupon = (fid) => {
        Swal.fire({
            title: "Are you sure",
            text: "Sure friends ?",
            icon: "warning",
            showCancelButton: true,
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteCoupon(fid);
                if (response.success) toast.success(response.message);
                else toast.error(response.message);
                render();
            }
        });
    };
    return (
        <div
            className={`${open ? "w-[83vw]" : "w-[94vw]"
                } bg-dash-board pl-4 relative`}
        >
            {editCoupon && (
                <div className="absolute inset-0 win-h-screen bg-gray-100 z-50">
                    <UpdateCoupon
                        editCoupon={editCoupon}
                        setEditCoupon={setEditCoupon}
                        render={render}
                    />
                </div>
            )}
            <div className="ml-2 py-4 border-b-2 border-gray-300">
                <h1 className="text-2xl font-bold tracking-tight">Manage Coupon</h1>
            </div>
            <div className="w-full p-2">
                <div className="px-1 pb-2">
                    <form className="w-[300px]">
                        <InputForm
                            id="q"
                            register={register}
                            errors={errors}
                            fullWidth
                            transform
                            placeholder="Search coupon by title"
                        />
                    </form>
                </div>
                <table className="table-auto w-full ">
                    <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-emerald-700 text-white  py-2">
                            <th className="px-4 py-2 text-center h-[60px] rounded-tl-lg">
                                #
                            </th>
                            <th className="px-4 py-2 text-center h-[60px]">Coupon Code</th>
                            <th className="px-4 py-2 text-center h-[60px]">Percent</th>
                            <th className="px-4 py-2 text-center h-[60px] rounded-tr-lg">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupon?.map((el, index) => (
                            <tr
                                className='odd:bg-white even:bg-gray-200/50 odd:dark:bg-gray-300 even:dark:bg-white border-b dark:border-gray-700"'
                                key={el._id}
                            >
                                <td className="text-center p ">
                                    {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                                        process.env.REACT_APP_PITCH_LIMIT +
                                        index +
                                        1}
                                </td>

                                <td className="text-center py-2">{el.title}</td>
                                <td className="text-center py-2">{el.price}%</td>
                                <td className="text-center py-2 ">
                                    <div className="flex items-center justify-center ">
                                        <span
                                            className="px-2 text-2xl text-green-500 hover:text-green-700 cursor-pointer"
                                            onClick={() => setEditCoupon(el)}
                                        >
                                            <FaRegEdit />
                                        </span>
                                        <span
                                            onClick={() => handleDeleteCoupon(el._id)}
                                            className="px-2 text-2xl text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <MdDeleteForever />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full flex justify-end my-8">
                    <Pagination type={'coupon'} totalCount={counts} />
                </div>
            </div>
        </div>
    );
};

export default ManageCoupon