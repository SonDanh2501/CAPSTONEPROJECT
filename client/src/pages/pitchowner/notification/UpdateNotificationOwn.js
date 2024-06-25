import React, { useCallback, useEffect, useState, memo } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiGetAllCategory, apiUpdateBrand, apiUpdateCouponAdmin, apiUpdateFAQ, apiUpdateNotification } from "apis";
import { showModal } from "store/app/appSlice";
import Select from "react-select";


const UpdateNotificationOwn = ({ editNotification, render, setEditNotification }) => {
  const dispatch = useDispatch();
  const [categories, setcategories] = useState(null);
  const [selectedCategories, setselectedCategories] = useState(null);
  const {
      register,
      formState: { errors },
      reset,
      handleSubmit,
      watch,
  } = useForm();

  const handleUpdateNotification = async (data) => {
    console.log("CHECK DATA >>>", data);
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateNotification(data, editNotification?._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      toast.success(response.message);
      render();
      setEditNotification(null);
    } else toast.error(response.message);
  };
  useEffect(() => {
    reset({
      title: editNotification?.title || "",
    });
  }, [editNotification]);
  return (
    <div className="w-full flex flex-col gap-4 px-4 relative">
      <div className="ml-2 py-4 border-b-2 border-gray-300 flex justify-between items-center top-0 right-0">
        <h1 className="text-2xl font-bold tracking-tight">Update Coupon</h1>
        <span
          className="text-green-700 hover:underline cursor-pointer"
          onClick={() => setEditNotification(null)}
        >
          Cancel
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateNotification)}>
          <div className="w-full pt-5 pb-10">
            <InputForm
              label="Title"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Need to be fill",
              }}
              fullWidth
              placeholder="Notification Title"
            />
          </div>
          <div className="my-8">
            <Button type="submit">Update Notification</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNotificationOwn