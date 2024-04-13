import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";

import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "ultils/helper";
import { toast } from "react-toastify";
import { apiCreateFAQ } from "apis";
import { showModal } from "store/app/appSlice";
import { useOutletContext } from "react-router-dom";

const CreateFAQ = () => {
  const [open, setOpen] = useOutletContext();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    description: "",
  });

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
        toast.success("Create FAQ Success !");
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
    <div className={`${open ? "w-[83vw]" : "w-[94vw]"} bg-dash-board pl-4`}>
      <div className="ml-2 py-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-bold tracking-tight">Create FAQ</h1>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateFAQ)}>
          <div className="w-full py-5">
            <InputForm
              label="Title"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Required",
              }}
              fullWidth
              placeholder="Question"
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
              <Button type="submit">Create new FAQ</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFAQ;
