import React, { useCallback, useEffect, useState, memo } from "react";
import { Button, InputForm, MarkDownEditor, Select, Loading } from "components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiUpdateNews } from "apis";
import { showModal } from "store/app/appSlice";

const UpdateNews = ({ editNews, render, setEditNews }) => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleUpdateNews = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };

      finalPayload.thumb =
        data?.thumb?.length === 0 ? preview.thumb : data.thumb[0];
      finalPayload.image =
        data?.image?.length === 0 ? preview.image : data.image[0];

      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      window.scrollTo(0, 0);

      const response = await apiUpdateNews(formData, editNews._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.message);
        render();
        setEditNews(null);
      } else toast.error(response.message);
    }
  };
  const [payload, setPayload] = useState({
    content: "",
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
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("image") instanceof FileList && watch("image").length > 0) {
      handlePreviewImage(watch("image")[0]);
    }
  }, [watch("image")]);

  useEffect(() => {
    reset({
      title: editNews?.title || "",
      description: editNews?.description || "",
      content: editNews?.content || "",
    });
    setPayload({
      content:
        typeof editNews?.content === "object"
          ? editNews?.content?.join(", ")
          : editNews?.content,
    });

    setPreview({
      ...preview,
      thumb: editNews?.thumb,
      image: editNews?.image,
    });
  }, [editNews]);
  return (
    <div className="w-full flex flex-col gap-4 px-4 relative">
      <div className="ml-2 py-4 border-b-2 border-gray-300 flex justify-between items-center top-0 right-0">
        <h1 className="text-2xl font-bold tracking-tight">Update News</h1>
        <span
          className="text-green-700 hover:underline cursor-pointer"
          onClick={() => setEditNews(null)}
        >
          Cancel
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateNews)}>
          <div className="w-full pt-5 pb-10">
            <InputForm
              label="Title of news"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Need to be fill",
              }}
              fullWidth
              placeholder="Title of news"
            />
          </div>

          <div className="w-full pt-5 pb-10 flex gap-4">
            <InputForm
              label="Description "
              register={register}
              errors={errors}
              id="description"
              validate={{
                required: "Need to be fill",
              }}
              style="flex-1"
              placeholder="description of news"
            />
          </div>
          <div className="w-full pt-5 ">
            <MarkDownEditor
              name="content"
              changeValue={changeValue}
              label="Content"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              value={payload.content}
            />
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input type="file" id="thumb" {...register("thumb")} />
            {errors["thumb"] && (
              <small className="text-sx text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview?.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Upload Image
            </label>
            <input type="file" id="image" {...register("image")} />
            {errors["image"] && (
              <small className="text-sx text-red-500">
                {errors["image"]?.message}
              </small>
            )}
          </div>
          {preview?.image && (
            <div className="my-4">
              <img
                src={preview.image}
                alt="image"
                className="w-[200px] object-contain"
              />
            </div>
          )}

          <div className="my-8">
            <Button type="submit">Update news</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateNews);
