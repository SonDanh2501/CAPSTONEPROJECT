import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiCreateNews, apiCreateNotifications } from "apis";
import { showModal } from "store/app/appSlice";
import { useOutletContext } from "react-router-dom";
const CreateNotification = () => {
  const { isLoggedIn, current, mes, isUpdateCart } = useSelector(
    (state) => state.user
  );
  const [open, setOpen] = useOutletContext();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleCreateNews = async (data) => {
    const finalPayload = {
      ...data,
      owner: +current?.role,
    };
    console.log(finalPayload);
    // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    // window.scrollTo(0, 0);
    // const response = await apiCreateNotifications(finalPayload);
    // console.log(response);
    // dispatch(showModal({ isShowModal: false, modalChildren: null }));
    // if (response.success) {
    //   reset();
    //   toast.success("Create News Success !");
    // } else {
    //   toast.error("Fail!!!");
    // }
  };
  return (
    <div className={`${open ? "w-[83vw]" : "w-[94vw]"} bg-dash-board pl-4`}>
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">
          Create Notfication
        </h1>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateNews)}>
          <div className="w-full py-5 ">
            <InputForm
              label="Title of notification"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Need to be fill",
              }}
              fullWidth
              style="flex-1"
              placeholder="Title ... "
            />
          </div>
          <div className="my-8">
            <Button type="submit">Create notification</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotification;