import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiCreatePitch, apiGetUsers, apiGetBrandByOwner } from "apis";
import { showModal } from "store/app/appSlice";
import Select from "react-select";
import { useOutletContext } from "react-router-dom";
const CreatePitch = () => {
  const [open, setOpen] = useOutletContext();
  const dispatch = useDispatch();
  const [Users, setUsers] = useState(null);

  const [Cate, setCate] = useState(null);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleCreatePitch = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = {
        ...data,
        ...payload,
        owner: selectedOwner,
        category: selectedCategories,
        brand: selectedBrand?.title,
      };

      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) {
        formData.append(i[0], i[1]);
      }
      if (finalPayload.thumb) {
        formData.append("thumb", finalPayload.thumb[0]);
      }
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append("images", image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      window.scrollTo(0, 0);
      console.log(formData);
      const response = await apiCreatePitch(formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        reset();
        setPayload({
          description: "",
        });
        setPreview({
          thumb: null,
          images: [],
        });

        toast.success("Create Pitch Success !");
      } else {
        toast.error("Fail!!!");
      }
    }
  };
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [payload, setPayload] = useState({
    description: "",
  });
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [hover, setHover] = useState(null);
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File type not correct");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 });
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  const fetchUsers = async () => {
    const response = await apiGetUsers({ limit: 99, role: 2 });
    if (response.success) setUsers(response.users);
  };
  useEffect(() => {
    if (watch("thumb")) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    if (selectedOwner) {
      fetchBrandOwner(selectedOwner);
    }
  }, [selectedOwner]);

  const fetchBrandOwner = async (id) => {
    const response = await apiGetBrandByOwner(id);
    if (response.success) {
      setSelectedBrand(response.brandData);

      setCate(response.brandData.categories);
    }
  };

  return (
    <div className={`${open ? "w-[83vw]" : "w-[94vw]"} bg-dash-board pl-4`}>
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Create Pitch</h1>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreatePitch)}>
          <div className="w-full py-5 ">
            <InputForm
              label="Name pitch"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Need to be fill",
              }}
              fullWidth
              style="flex-1"
              placeholder="Name of new pitch"
            />
          </div>
          <div className="w-full pt-10 pb-5 flex items-center gap-4">
            <div className="flex-1 items-center">
              <h2 className="font-bold">Owner:</h2>
              <Select
                maxMenuHeight={150}
                label="Owner"
                options={Users?.map((el) => ({
                  value: el._id,
                  label: `${el.firstname} ${el.lastname}`,
                }))}
                id="owner"
                placeholder={"Select Owner"}
                onChange={(selectedOptions) => {
                  setSelectedOwner(selectedOptions.value);
                }}
                errors={errors}
              />
            </div>
            <div className="flex-1 items-center">
              <h2 className="font-bold">Category:</h2>
              <Select
                maxMenuHeight={150}
                label="Category"
                options={Cate?.map((el) => ({
                  value: el,
                  label: el,
                }))}
                id="category"
                onChange={(selectedOptions) => {
                  setSelectedCategories(selectedOptions.label);
                }}
              />
            </div>
          </div>
          <div className="w-full pb-5 flex gap-4">
            <InputForm
              label="Price pitch morning"
              register={register}
              errors={errors}
              id="price_morning"
              validate={{
                required: "Need to be fill",
              }}
              style="flex-1"
              placeholder="Price of new pitch"
              type="number"
            />
            <InputForm
              label="Address"
              register={register}
              errors={errors}
              id="address"
              validate={{
                required: "Need to be fill",
              }}
              style="flex-1"
              placeholder="Address of new pitch"
            />
          </div>
          <div className="w-full pb-5 mt-10 flex gap-4">
            <InputForm
              label="Price pitch afternoon"
              register={register}
              errors={errors}
              id="price_afternoon"
              style="flex-1"
              placeholder="Price of new pitch"
              type="number"
            />
            <InputForm
              label="Price pitch evening"
              register={register}
              errors={errors}
              id="price_evening"
              style="flex-1"
              placeholder="Price of new pitch"
              type="number"
            />
          </div>
          <div className="w-full pt-10 pb-5">
            <InputForm
              label="Brand"
              register={register}
              errors={errors}
              id="brand"
              validate={{}}
              style="flex-1"
              value={selectedBrand?.title}
              placeholder={`${selectedBrand?.title || "brand"}`}
              disable={true}
            />
          </div>
          {/*Long and Last Location */}
          <div className="w-full pb-5 mt-10 flex gap-4">
            <InputForm
              label="Longitude"
              register={register}
              errors={errors}
              id="longitude"
              style="flex-1"
              placeholder="Longitude location"
            />
            <InputForm
              label="Latitude"
              register={register}
              errors={errors}
              id="latitude"
              style="flex-1"
              placeholder="Latitude location"
            />
          </div>
          <div className="w-full pt-10">
            <MarkDownEditor
              name="description"
              changeValue={changeValue}
              label="Description"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          </div>
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
            <label className="font-semibold" htmlFor="pitches">
              Upload Image Of Pitch
            </label>
            <input
              type="file"
              id="pitches"
              {...register("images", { required: "Need Select" })}
              multiple
            />
            {errors["images"] && (
              <small className="text-sx text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images.map((el) => (
                <div
                  onMouseEnter={() => setHover(el.name)}
                  onMouseLeave={() => setHover(null)}
                  key={el.name}
                  className="w-fit relative"
                >
                  <img
                    src={el.path}
                    alt="thumbnail"
                    className="w-[200px] object-contain"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="my-8">
            <Button type="submit">Create new pitch</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePitch;
