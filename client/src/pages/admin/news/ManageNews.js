import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiGetAllNews, apiDeleteNews } from "apis";
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
import UpdateNews from "pages/admin/news/UpdateNews";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
const { MdEdit, MdDeleteForever } = icons;

const ManageNews = () => {
  const [open, setOpen] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [news, setNews] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editNews, setEditNews] = useState(null);
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  });
  const fetchNews = async (params) => {
    const response = await apiGetAllNews({
      ...params,
      limit: 9,
    });
    if (response.success) {
      setNews(response.news);
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
    fetchNews(searchParams);
  }, [params, update]);

  const handleDeletePitch = (nid) => {
    Swal.fire({
      title: "Are you sure",
      text: "Do you want to delete ?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteNews(nid);
        if (response.success) toast.success(response.message);
        else toast.error(response.message);
        render();
      }
    });
  };
  return (
    <div
      className={`
      ${open ? "w-[83vw]" : "w-[94vw]"} 
      ${editNews && "relative"} 
      bg-dash-board pl-4`}
    >
      {editNews && (
        <div className="absolute inset-0 h-fit bg-gray-100 z-50">
          <UpdateNews
            editNews={editNews}
            render={render}
            setEditNews={setEditNews}
          />
        </div>
      )}
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Manage News</h1>
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
              placeholder="Search news by title, description ..."
            />
          </form>
        </div>
        <table className="table-auto w-full min-w-full">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-emerald-700 text-white py-2">
              <th className="px-4 py-2 text-center h-[60px] rounded-tl-lg">
                #
              </th>
              <th className="px-4 py-2 text-center h-[60px]">Thumb</th>
              <th className="px-4 py-2 text-center h-[60px]">Title</th>
              <th className="px-4 py-2 text-center h-[60px]">Description</th>
              <th className="px-4 py-2 text-center h-[60px]">Views</th>
              <th className="px-2 py-2 text-center h-[60px]">Posted Date</th>
              <th className="px-4 py-2 text-center h-[60px] rounded-tr-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {news?.map((el, index) => (
              <tr
                className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-white border-b dark:border-gray-700"'
                key={el._id}
              >
                <td className="text-center px-2 py-2">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
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

                <td className="text-center px-2 py-2">
                  <div className="">{el.title}</div>
                </td>
                <td className="text-center px-2 py-2">
                  <div className="line-clamp-1">{el.description}</div>
                </td>
                <td className="text-center px-2 py-2">{el.views}</td>
                <td className="text-center px-2 py-2">
                  {moment(el.postedDate).format("DD/MM/YYYY")}
                </td>

                <td className="text-center py-2">
                  <div className="flex items-center justify-center">
                    <span
                      className="text-green-500 hover:text-green-700 cursor-pointer px-2 text-2xl"
                      onClick={() => setEditNews(el)}
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
          <Pagination totalCount={counts} type="news" />
        </div>
      </div>
    </div>
  );
};

export default ManageNews;
