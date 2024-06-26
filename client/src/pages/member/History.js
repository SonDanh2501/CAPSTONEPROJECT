import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiDeletePitch, apiGetUserOrder } from "apis";
import moment from "moment";
import { formatMoney, formatPrice } from "ultils/helper";
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
import { useSelector } from "react-redux";

const History = () => {
  const [open, setOpen] = useOutletContext();
  const { current } = useSelector((state) => state.user);
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
    const response = await apiGetUserOrder(current._id);
    if (response.success) {
      setPitches(response.Booking);
      setCounts(response.Booking.length);
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
      className={`
      ${open ? "w-[83vw]" : "w-[94vw]"} 
      bg-dash-board pl-4`}
    >
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">History</h1>
      </div>
      <div className="w-full p-2">
        <div className="pb-2">
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
            <tr className="bg-emerald-700 text-white py-2">
              <th className="text-center h-[60px] rounded-tl-lg">#</th>
              <th className="text-center h-[60px] ">Title</th>
              <th className="text-center h-[60px] ">Total Price</th>
              <th className="text-center h-[60px] ">Create At</th>
              <th className="text-center h-[60px] ">Status</th>
            </tr>
          </thead>
          <tbody>
            {pitches?.map((el, index) => (
              <tr
                className='odd:bg-white even:bg-gray-200/50 odd:dark:bg-gray-300 even:dark:bg-white border-b dark:border-gray-700"'
                key={el._id}
              >
                <td className="text-center px-4 py-4 ">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    process.env.REACT_APP_PITCH_LIMIT +
                    index +
                    1}
                </td>
                <td className="text-center px-2 py-2">{el.pitch.title}</td>
                <td className="text-center px-2 py-2">
                  <span className="bg-gray-500/25 rounded-md p-2">
                    {`${formatMoney(formatPrice(el.total))} VNĐ`}
                  </span>
                </td>
                <td className="text-center px-2 py-2">
                  {moment(el.bookedDate).format("DD/MM/YYYY")}
                </td>
                <td className="text-center px-2 py-2">
                  <span
                    className={`${
                      el?.status === "Pay By Cash"
                        ? "text-blue-500 bg-blue-300/25 rounded-md p-2"
                        : el?.status === "Success"
                        ? "text-green-500 bg-green-300/25 rounded-md p-2"
                        : el?.status === "Pending" &&
                          "text-yellow-500 bg-yellow-300/25 rounded-md p-2"
                    }`}
                  >
                    {el.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-end my-8">
          <Pagination totalCount={counts} type="orders" />
        </div>
      </div>
    </div>
  );
};

export default History;
