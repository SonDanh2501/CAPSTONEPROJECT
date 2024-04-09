import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiGetAllBrands, apiDeleteBrand } from "apis";
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
import UpdateBrand from "./UpdateBrand";
import { FaRegEdit } from "react-icons/fa";
const { AiFillStar, MdDeleteForever } = icons;

const ManageBrand = () => {
  const [open, setOpen] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [brands, setBrands] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editBrand, setEditBrand] = useState(null);
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  });
  const fetchBrands = async (params) => {
    const response = await apiGetAllBrands({
      ...params,
      limit: process.env.REACT_APP_PITCH_LIMIT,
    });
    if (response.success) {
      setBrands(response.Brands);
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
    fetchBrands(searchParams);
  }, [params, update]);

  const handleDeleteBrand = (bid) => {
    Swal.fire({
      title: "Are you sure",
      text: "Sure friends ?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteBrand(bid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
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
      {editBrand && (
        <div className="absolute inset-0 win-h-screen bg-gray-100 z-50">
          <UpdateBrand
            editBrand={editBrand}
            render={render}
            setEditBrand={setEditBrand}
          />
        </div>
      )}
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Manage Brand</h1>
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
              placeholder="Search products by title, address ..."
            />
          </form>
        </div>
        <table className="table-auto w-full ">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-sky-900 text-white  py-2">
              <th className="px-4 py-2 text-center h-[60px] rounded-tl-lg">
                #
              </th>
              <th className="text-center">Thumb</th>
              <th className="text-center">Title</th>
              <th className="text-center">Address</th>
              <th className="text-center">Category</th>
              <th className="text-center">Ratings</th>
              <th className="text-center">Create At</th>
              <th className="text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands?.map((el, index) => (
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
                <td className="text-center">
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
                <td className="text-center py-2">{el.title}</td>
                <td className="text-center ">
                  <div className="line-clamp-1">{el.address}</div>
                </td>
                <td className="text-center py-2">
                  <div className="flex flex-col items-center justify-center">
                    {el.categories.map((category, index) => (
                      <sm key={index + 1}>{category}</sm>
                    ))}
                  </div>
                </td>
                <td className="text-center py-2">
                  <div className="flex items-center justify-center">
                    {el.totalRatings}
                    <AiFillStar className="ml-1 text-yellow-500" />
                  </div>
                </td>
                <td className="text-center py-2">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="text-center py-2 ">
                  <div className="flex items-center justify-center ">
                    <span
                      className="px-2 text-2xl text-green-500 hover:text-green-700 cursor-pointer"
                      onClick={() => setEditBrand(el)}
                    >
                      <FaRegEdit />
                    </span>
                    <span
                      onClick={() => handleDeleteBrand(el._id)}
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
          <Pagination totalCount={counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageBrand;
