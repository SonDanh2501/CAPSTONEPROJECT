import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm, Loading } from "components";
import { useDispatch, useSelector } from "react-redux";
import avatar from "assets/defaultava.png";
import moment from "moment";
import { apiUpdateCurrent } from "apis";
import { getCurrent } from "store/user/asyncAction";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";

const Personal = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      email: current?.email,
      avatar: current?.avatar,
    });
  }, [current]);
  const handleUpdateInfor = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) {
    }
    formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    window.scrollTo(0, 0);
    const response = await apiUpdateCurrent(formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.mes);
    } else toast.error(response.mes);
  };
  return (
    <div className="w-full relative px-6">
      <header className="text-2xl font-bold tracking-tight ml-2 py-4 border-b-2 border-gray-300">
        Personal
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="ml-2 my-2 flex flex-col gap-2"
      >
        <InputForm
          label="Firstname"
          register={register}
          errors={errors}
          id="firstname"
          validate={{ required: "Need fill this field" }}
        />
        <InputForm
          label="Lastname"
          register={register}
          errors={errors}
          id="lastname"
          validate={{ required: "Need fill this field" }}
          style="mt-8"
        />
        <InputForm
          label="Email address"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Need fill this field",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email invalid.",
            },
          }}
          style="mt-8"
        />
        <div className="flex items-center gap-2 mt-8">
          <span className="font-semibold">Account status:</span>
          <span className={`${current?.isBlocked === 1 ? "text-red-500" : "text-green-500"}`}>{current?.isBlocked === 1 ? "Blocked" : "Actived"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Role:</span>
          <span>
            {+current?.role === 1
              ? "Admin"
              : +current?.role === 2
              ? "Pitch Owner"
              : "User"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Created At:</span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Profile image:</span>
          <label htmlFor="file">
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-20 h-20 0.object-cover border-2 border-black rounded-md"
            ></img>
          </label>
          <input type="file" id="file" {...register("avatar")} hidden></input>
        </div>

        {isDirty && (
          <div className="w-full flex justify-end">
            <Button type="submit">Update information</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Personal;
