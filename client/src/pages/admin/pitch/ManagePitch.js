import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiGetPitches, apiDeletePitch } from "apis";
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
import UpdatePitch from "pages/admin/pitch/UpdatePitch";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatMoney, formatPrice } from "ultils/helper";
import { FaRegEdit } from "react-icons/fa";

const { AiFillStar, MdEdit, MdDeleteForever } = icons;

const ManagePitch = () => {
  const [open, setOpen] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [pitches, setPitches] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editPitch, setEditPitch] = useState(null);
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  });
  const fetchPitches = async (params) => {
    const response = await apiGetPitches({
      ...params,
      limit: process.env.REACT_APP_PITCH_LIMIT,
    });
    if (response.success) {
      setPitches(response.pitches);
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
    fetchPitches(searchParams);
  }, [params, update]);

  const handleDeletePitch = (pid) => {
    Swal.fire({
      title: "Are you sure",
      text: "Sure friends ?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeletePitch(pid);
        if (response.success) toast.success(response.mes);
        else toast.error(response.mes);
        render();
      }
    });
  };
  return (
    <div
      className={`${
        open ? "w-[83vw]" : "w-[94vw]"
      } bg-dash-board pl-4 relative`}
    >
      {editPitch && (
        <div className="absolute inset-0 win-h-screen bg-gray-100 z-50">
          <UpdatePitch
            editPitch={editPitch}
            render={render}
            setEditPitch={setEditPitch}
          />
        </div>
      )}
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Manage Pitch</h1>
      </div>
      <div className="w-full p-2">
        <div className="px-1 pb-2">
          {/* <form className='w-[300px]' onSubmit={handleSubmit(handleManagePitch)}> */}
          <form className="w-[300px]">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullWidth
              transform
              placeholder="Search products by title, description ..."
            />
          </form>
        </div>
        <table className="table-auto w-full ">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-sky-900 text-white py-2">
              <th className="text-center h-[60px] rounded-tl-lg">#</th>
              <th className="text-center">Thumb</th>
              <th className="text-center">Title</th>
              <th className="text-center">Address</th>
              <th className="text-center">Brand</th>
              <th className="text-center w-40">Category</th>
              <th className="text-center w-[110px]">Price Morning</th>
              <th className="text-center w-[110px]">Price Afternoon</th>
              <th className="text-center w-[110px]">Price Evening</th>
              <th className="text-center">Ratings</th>
              <th className="text-center">Create At</th>
              <th className="text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pitches?.map((el, index) => (
              <tr
                className='odd:bg-white even:bg-gray-200/50 odd:dark:bg-gray-300 even:dark:bg-white border-b dark:border-gray-700"'
                key={el._id}
              >
                <td className="text-center px-6 py-5 ">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    process.env.REACT_APP_PITCH_LIMIT +
                    index +
                    1}
                </td>
                <td className="text-center py-2">
                  <div className="flex items-center justify-center">
                    {el.thumb ? (
                      <img
                        src={el.thumb}
                        alt="thumb"
                        className="w-[80px] h-[70px] object-fill "
                      />
                    ) : (
                      <img
                        src={defaultt}
                        alt="thumb"
                        className="w-20 h-[70px] object-cover"
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
                <td className="px-6 py-5 text-center">{el.brand}</td>
                <td className="px-6 py-5 text-center">
                  <span
                    className={`${
                      el?.category === "Sân 5 Người"
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
                <td className="text-center ">
                  <div className="flex items-center justify-center">
                    <span
                      className="text-green-500 hover:text-green-700 cursor-pointer px-2 text-2xl"
                      onClick={() => setEditPitch(el)}
                    >
                      <FaRegEdit />
                    </span>
                    <span
                      onClick={() => handleDeletePitch(el._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer px-2 text-2xl"
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
          <Pagination totalCount={counts} />
        </div>
      </div>
    </div>
  );
};

export default ManagePitch;
