import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiCreateCoupon } from "apis";
import { showModal } from "store/app/appSlice";
import { useOutletContext } from "react-router-dom";

const CreateCoupon = () => {
    const [open, setOpen] = useOutletContext();
    const dispatch = useDispatch();
    const { current } = useSelector((state) => state.user);

    const { categories } = useSelector((state) => state.app);
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
    } = useForm();
    const handleCreateCoupon = async (data) => {
        const invalids = validate(setInvalidFields);
        if (invalids === 0) {
            const finalPayload = {
                ...data,
                owner: current._id,
            };
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
            window.scrollTo(0, 0);
            const response = await apiCreateCoupon(finalPayload);
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
            if (response.success) {
                reset();
                toast.success("Create Coupon Success !");
            } else {
                toast.error("Fail!!!");
            }
        }
    };
    const [invalidFields, setInvalidFields] = useState([]);
    // const changeValue = useCallback(
    //     (e) => {
    //         setPayload(e);
    //     },
    //     [payload]
    // );
    return (
        <div className={`${open ? "w-[83vw]" : "w-[94vw]"} bg-dash-board pl-4`}>
            <div className="ml-2 py-4 border-b-2 border-gray-300">
                <h1 className="text-2xl font-bold tracking-tight">Create Coupon</h1>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit(handleCreateCoupon)}>
                    <div className="w-full py-5">
                        <InputForm
                            label="Coupon Code"
                            register={register}
                            errors={errors}
                            id="title"
                            validate={{
                                required: "Required",
                            }}
                            fullWidth
                            placeholder="Code of Your Coupon"
                        />
                    </div>
                    <div className="w-full pt-10">
                        <InputForm
                            label="Percent discount"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                required: "Required",
                            }}
                            fullWidth
                            placeholder="Percent discount ( % )"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div></div>
                        <div className="my-12">
                            <Button type="submit">Create new Coupon</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCoupon