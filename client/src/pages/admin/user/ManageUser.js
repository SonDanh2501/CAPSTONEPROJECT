import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
// import { Select as RoleSelect } from "react-select";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  apiGetUsers,
  apiUpdateUserByAdmin,
  apiDeleteUserByAdmin,
} from "apis/user";

import { roles, blockStatus } from "ultils/constant";
import icons from "ultils/icons";
import useDebounce from "hooks/useDebounce";

import { Pagination, InputForm, Select, Button } from "components";

import moment from "moment";
import Swal from "sweetalert2";
// import clsx from "clsx";

const { FaRegEdit, MdDeleteForever, FaSave, TiCancel } = icons;
const ManageUser = () => {
  const [open, setOpen] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [user, setUsers] = useState(null);
  const [selectedRole, setSelectedRole] = useState(4);
  const [update, setUpdate] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const queryDebounce = useDebounce(watch("q"), 300);
  const { t } = useTranslation();

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  // call api get data user
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_PITCH_LIMIT,
    });
    if (response.success) setUsers(response);
  };

  // Update user information after editting
  const handleUpdate = async (data) => {
    const response = await apiUpdateUserByAdmin(data, editUser._id);
    if (response.success) {
      setEditUser(null);
      render();
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  };

  // Delete User from list
  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: `${t("Are you sure...")}`,
      text: `${t("Delete User ?")}`,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUserByAdmin(uid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else {
          toast.error(response.mes);
        }
      }
    });
  };
  // reload list after edit user information
  useEffect(() => {
    if (editUser) {
      reset({
        email: editUser.email,
        firstname: editUser.firstname,
        lastname: editUser.lastname,
        role: editUser.role,
        isBlocked: editUser.isBlocked,
      });
    }
  }, [editUser]);
  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else {
      if (!editUser)
        navigate({
          pathname: location.pathname,
        });
    }
  }, [queryDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchUsers(searchParams);
    setEditUser(null);
  }, [params, update, selectedRole]);

  const options = [
    { code: 0, value: "Pitch Owner" },
    { code: 1, value: "User" },
  ];
  console.log(selectedRole);
  return (
    <div className={`${open ? "w-[83vw]" : "w-[94vw]"} bg-dash-board pl-4`}>
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("Manage User")}
        </h1>
      </div>
      <div className="w-full p-2">
        <div className="pb-2">
          {/* <form className='w-[300px]' onSubmit={handleSubmit(handleManagePitch)}> */}
          <form className="w-[300px] ">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullWidth
              transform
              placeholder={t(`Search user by email, name, ...`)}
            />
          </form>

          {/* <div className="w-[300px]">
            <RoleSelect
              defaultValue={selectedRole}
              onChange={}
              options={options}
            />
          </div> */}
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <table className="table-auto w-full ">
            <thead className="text-md  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-sky-900 text-white py-2">
                <th className="text-center h-[60px] rounded-tl-lg">#</th>
                <th className="text-center">{t(`Email`)}</th>
                <th className="text-center">{t(`First name`)}</th>
                <th className="text-center">{t(`Last name`)}</th>
                <th className="text-center">{t(`Role`)}</th>
                <th className="text-center">{t(`Status`)}</th>
                <th className="text-center">{t(`Create At`)}</th>
                <th className="text-center rounded-tr-lg">{t(`Actions`)}</th>
              </tr>
            </thead>
            <tbody>
              {user?.users?.map((el, index) => (
                <tr
                  key={el._id}
                  className='odd:bg-white even:bg-gray-200/50 odd:dark:bg-gray-300 even:dark:bg-white border-b dark:border-gray-700"'
                >
                  <td className="text-center px-4 py-4">
                    {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                      process.env.REACT_APP_PITCH_LIMIT +
                      index +
                      1}
                  </td>
                  <td className="text-center px-2 py-2">
                    {editUser?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"email"}
                        placeholder="Email"
                        validate={{
                          required: "Enter your email",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                        txtSmall
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="text-center px-2 py-2">
                    {editUser?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"firstname"}
                        placeholder="First name"
                        validate={{ required: "Enter your first name" }}
                        txtSmall
                      />
                    ) : (
                      <span>{el.firstname}</span>
                    )}
                  </td>
                  <td className="text-center px-2 py-2">
                    {editUser?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"lastname"}
                        placeholder="Last name"
                        validate={{ required: "Enter your last name" }}
                        txtSmall
                      />
                    ) : (
                      <span>{el.lastname}</span>
                    )}
                  </td>
                  {/*
                   * Tìm trong list roles (bên ultili) nếu có thì trả về object nên trỏ tiếp tới value để in
                   */}
                  <td className="text-center px-2 py-2">
                    {editUser?._id === el._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"role"}
                        validate={{ required: "Please Select" }}
                        options={roles}
                      />
                    ) : (
                      <span>
                        {roles.find((role) => role.code === +el.role)?.value}
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    {editUser?._id === el._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"isBlocked"}
                        validate={{ required: "Please Select" }}
                        options={blockStatus}
                      />
                    ) : (
                      <span
                        className={`${
                          +el?.isBlocked === 1
                            ? "p-2 text-red-500 bg-red-300/25 rounded-md"
                            : "p-2 text-green-500 bg-green-300/25 rounded-md"
                        }`}
                      >
                        {
                          blockStatus.find(
                            (status) => status.code === +el.isBlocked
                          )?.value
                        }
                      </span>
                    )}
                  </td>
                  <td className="text-center px-2 py-2">
                    {moment(el.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center ">
                      {editUser?._id === el._id ? (
                        <>
                          <button
                            className="px-2 text-2xl text-green-500 hover:text-green-700 cursor-pointer"
                            type="submit"
                          >
                            <FaSave />
                          </button>
                          <span
                            onClick={() => setEditUser(null)}
                            className="px-2 text-2xl text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <TiCancel />
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            onClick={() => setEditUser(el)}
                            className="px-2 text-2xl text-green-500 hover:text-green-700 cursor-pointer"
                          >
                            <FaRegEdit />
                          </span>
                          <span
                            onClick={() => handleDeleteUser(el._id)}
                            className="px-2 text-2xl text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <MdDeleteForever />
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {user?.users?.length == 0 && <span>{t(`No data`)}</span>}
            </tbody>
          </table>
        </form>
        <div className="w-full flex justify-end mt-2">
          <Pagination totalCount={user?.counts} type="users" />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
