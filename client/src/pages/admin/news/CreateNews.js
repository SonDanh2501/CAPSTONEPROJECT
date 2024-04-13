import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiCreateNews } from "apis";
import { showModal } from "store/app/appSlice";
const CreateNews = () => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleCreateNews = async (data) => {
    console.log("adsasd");
    console.log("check1");
    const invalids = validate(payload, setInvalidFields);
    console.log(invalids);
    if (invalids === 0) {
      const finalPayload = {
        ...data,
        ...payload,
      };
      console.log("check");
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) {
        formData.append(i[0], i[1]);
      }
      if (finalPayload.thumb) {
        formData.append("thumb", finalPayload.thumb[0]);
      }
      if (finalPayload.image) {
        formData.append("image", finalPayload.image[0]);
      }
      console.log("show formdata", formData);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      window.scrollTo(0, 0);
      const response = await apiCreateNews(formData);
      console.log(response);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        reset();
        setPayload({
          //   description: "",
          content: "",
          //   title: "",
        });
        setPreview({
          thumb: null,
          image: null,
        });

        toast.success("Create News Success !");
      } else {
        toast.error("Fail!!!");
      }
    }
  };

  const [payload, setPayload] = useState({
    // description: "",
    content: "",
    // title: "",
  });
  const [preview, setPreview] = useState({
    thumb: null,
    image: null,
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImage = async (file) => {
    const base64image = await getBase64(file);
    setPreview((prev) => ({ ...prev, image: base64image }));
  };

  useEffect(() => {
    if (watch("thumb")) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  useEffect(() => {
    if (watch("image")) handlePreviewImage(watch("image")[0]);
  }, [watch("image")]);

  return (
    <div className="w-full flex flex-col gap-4 px-4 ">
      <div className="p-4 border-b w-full flex items-center ">
        <h1 className="text-3xl font-bold tracking-tight">Create News</h1>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateNews)}>
          <div className="w-full py-5 ">
            <InputForm
              label="Title of news"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Need to be fill",
              }}
              fullWidth
              style="flex-1"
              placeholder="title of news"
            />
          </div>

          <div className="w-full pb-5 flex mt-10 ">
            <InputForm
              label="Description"
              register={register}
              errors={errors}
              id="description"
              validate={{
                required: "Need to be fill",
              }}
              style="flex-1"
              placeholder="Description of news"
            />
          </div>

          <div className="w-full pt-10">
            <MarkDownEditor
              name="content"
              changeValue={changeValue}
              label="Content"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          </div>

          {/* <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input
              type="file"
              id="thumb"
              {...register("thumb", { required: "Need Select" })}
            />
            {errors["thumb"] && (
              <small className="text-sx text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )} */}
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input
              type="file"
              id="thumb"
              {...register("thumb", { required: "Need Select" })}
            />
            {errors["thumb"] && (
              <small className="text-sx text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              {...register("image", { required: "Need Select" })}
            />
            {errors["image"] && (
              <small className="text-sx text-red-500">
                {errors["image"]?.message}
              </small>
            )}
          </div>
          {preview.image && (
            <div className="my-4">
              <img
                src={preview.image}
                alt="image"
                className="w-[200px] object-contain"
              />
            </div>
          )}
          <div className="my-8">
            <Button type="submit">Create news</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
