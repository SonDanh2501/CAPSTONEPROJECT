import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiCreateBrand, apiCreateFAQ, apiGetUsers } from "apis";
import { showModal } from "store/app/appSlice";

const CreateFAQ = () => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    description: "",
  });
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const handleCreateFAQ = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = {
        ...data,
        ...payload,
      };
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      window.scrollTo(0, 0);
      const response = await apiCreateFAQ(finalPayload);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        reset();
        setPayload({
          description: "",
        });
        toast.success("Create Brand Success !");
      } else {
        toast.error("Fail!!!");
      }
    }
  };
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
  return (
    <div className="w-full flex flex-col gap-4 px-4 ">
      <div className="p-4 border-b w-full flex items-center ">
        <h1 className="text-3xl font-bold tracking-tight">Create Brand</h1>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateFAQ)}>
          <div className="w-full py-5">
            <InputForm
              label="Name Brand"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Required",
              }}
              fullWidth
              placeholder="Name of Your Brand"
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
          <div className="flex justify-between">
            <div></div>
            <div className="my-8">
              <Button type="submit">Create new Brand</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFAQ