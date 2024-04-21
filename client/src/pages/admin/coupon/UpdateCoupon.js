import React, { useCallback, useEffect, useState, memo } from "react";
import { Button, InputForm, MarkDownEditor, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helper";
import { toast } from "react-toastify";
import { apiGetAllCategory, apiUpdateBrand, apiUpdateCouponAdmin, apiUpdateFAQ } from "apis";
import { showModal } from "store/app/appSlice";
import Select from "react-select";

const UpdateCoupon = ({ editCoupon, render, setEditCoupon }) => {
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
        const invalids = validate(setInvalidFields);
        if (invalids === 0) {
            if (data.categories) data.categories = selectedCategories;
            const finalPayload = { ...data };
            console.log("CHECK INPUT", finalPayload)
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
            const response = await apiUpdateCouponAdmin(finalPayload, editCoupon?._id);
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
            if (response.success) {
                toast.success(response.message);
                render();
                setEditCoupon(null);
            } else toast.error(response.message);
        }
    };

    const [invalidFields, setInvalidFields] = useState([]);
    // const changeValue = useCallback(
    //     (e) => {
    //         setPayload(e);
    //     },
    //     [payload]
    // );


    useEffect(() => {
        reset({
            title: editCoupon?.title || "",
            price: editCoupon?.price || "",
        });
        // setPayload({
        //     description:
        //         typeof editCoupon?.description === "object"
        //             ? editCoupon?.description?.join(", ")
        //             : editCoupon?.description,
        // });
    }, [editCoupon]);
    return (
        <div className="w-full flex flex-col gap-4 px-4 relative">
            <div className="ml-2 py-4 border-b-2 border-gray-300 flex justify-between items-center top-0 right-0">
                <h1 className="text-2xl font-bold tracking-tight">Update Coupon</h1>
                <span
                    className="text-main hover:underline cursor-pointer"
                    onClick={() => setEditCoupon(null)}
                >
                    Cancel
                </span>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit(handleUpdateBrand)}>
                    <div className="w-full pt-5 pb-10">
                        <InputForm
                            label="Code Coupon"
                            register={register}
                            errors={errors}
                            id="title"
                            validate={{
                                required: "Need to be fill",
                            }}
                            fullWidth
                            placeholder="Code of new Coupon"
                        />
                    </div>
                    <div className="w-full pt-5 pb-10">
                        <InputForm
                            label="Percent discount"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                required: "Need to be fill",
                            }}
                            fullWidth
                            placeholder="Discount of Coupon"
                        />
                    </div>

                    <div className="my-8">
                        <Button type="submit">Update Coupon</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCoupon