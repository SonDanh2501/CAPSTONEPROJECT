import React, { useCallback, useEffect, useState, memo } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiGetAllCategory, apiUpdateBrand, apiUpdateFAQ } from "apis";
import { showModal } from "store/app/appSlice";
import Select from "react-select";

const UpdateFAQ = ({ editFaq, render, setEditFaq }) => {
  console.log(editFaq?._id)
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

  const handleUpdateBrand = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.categories) data.categories = selectedCategories;
      const finalPayload = { ...data, ...payload };
      console.log("CHECK INPUT",finalPayload)
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateFAQ(finalPayload, editFaq?._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.message);
        render();
        setEditFaq(null);
      } else toast.error(response.message);
    }
  };
  const [payload, setPayload] = useState({
    description: "",
  });

  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );


  useEffect(() => {
    reset({
      title: editFaq?.title || "",
      //   price: editFaq?.price || "",
    });
    setPayload({
      description:
        typeof editFaq?.description === "object"
          ? editFaq?.description?.join(", ")
          : editFaq?.description,
    });
  }, [editFaq]);
  return (
    <div className="w-full flex flex-col gap-4 px-4 relative">
      <div className="p-4 border-b  bg-gray-100 flex justify-between items-center  top-0 left-[327px] right-0">
        <h1 className="text-3xl font-bold tracking-tight">Update FAQ</h1>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setEditFaq(null)}
        >
          Cancel
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateBrand)}>
          <div className="w-full pt-5 pb-10">
            <InputForm
              label="Name Brand"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Need to be fill",
              }}
              fullWidth
              placeholder="Name of new Brand"
            />
          </div>
          <div className="w-full pt-5">
            <MarkDownEditor
              name="description"
              changeValue={changeValue}
              label="Description"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              value={payload.description}
            />
          </div>

          <div className="my-8">
            <Button type="submit">Update Brand</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFAQ