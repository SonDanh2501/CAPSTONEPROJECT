const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
    const { title, price } = req.body;
    if (!title || !price) throw new Error("Missing inputs");
    const response = await Coupon.create(req.body);
    return res.json({
        success: response ? true : false,
        mes: response ? "Create Coupon Success" : "Fail!!!",
    });
});

const getCoupon = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const response = await Coupon.findOne({ title });
    return res.json({
        success: response ? true : false,
        coupon: response ? response : "Cannot add coupon",
    });
});
const getAllCoupon = asyncHandler(async (req, res) => {
    const response = await Coupon.find();
    return res.json({
        success: response ? true : false,
        coupon: response ? response : "Can not get data",
    });
});
module.exports = {
    createCoupon,
    getCoupon,
    getAllCoupon
};
