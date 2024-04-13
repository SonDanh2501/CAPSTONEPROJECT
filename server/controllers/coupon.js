const Coupon = require("../models/coupon");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
    const { title, price, owner } = req.body;
    if (!title || !price || !owner) throw new Error("Missing inputs");
    const user = await User.findById(owner);
    const couponData = {
        title,
        price,
        owner: owner,
        role: user.role // Assigning the user's role to the coupon
    };
    const response = await Coupon.create(couponData);

    return res.json({
        success: response ? true : false,
        mes: response ? "Create Coupon Success" : "Fail!!!",
        userRole: user ? user.role : null // Return the user's role or null if user is not found
    });
});

const getCoupon = asyncHandler(async (req, res) => {
    const { title, ownerId } = req.body;
    let response;

    // Find the coupon based on the role specified in the coupon document
    const coupon = await Coupon.findOne({ title });

    if (!coupon) {
        return res.json({
            success: false,
            message: "Coupon not found",
        });
    }

    if (coupon.role == 1) {
        // If the coupon's role is 1, only search for coupons by title
        response = await Coupon.findOne({ title });
    } else if (coupon.role == 2 && ownerId.length < 2) {
        // If the coupon's role is 2 and ownerId is provided, search for coupons by both title and owner
        response = await Coupon.findOne({ title, owner: ownerId });
    }

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

const getCouponAdmin = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    // tách các trường đặc biệt ra khỏi query
    const exlcludeFields = ["limit", "sort", "page", "fields"];
    exlcludeFields.forEach((el) => delete queries[el]);
    //Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
        /\b(gte|gt|lt|lte)\b/g,
        (matchedEl) => `$${matchedEl}`
    );
    const formartedQueries = JSON.parse(queryString);

    // Filtering
    if (queries?.title)
        formartedQueries.title = { $regex: queries.title, $options: "i" };

    if (req.query.q) {
        delete formartedQueries.q;
        formartedQueries["$or"] = [{ title: { $regex: queries.q, $options: "i" } }];
    }
    let queryCommand = Coupon.find(formartedQueries);
    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        queryCommand = queryCommand.select(fields);
    }

    //Pagination
    //limit : số object lấy về 1 lần gọi API
    //skip 2 (bỏ qua 2 cái đầu)
    // +2 => 2
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PITCHS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    // Executed query

    queryCommand
        .then(async (response) => {
            const counts = await Coupon.find(formartedQueries).countDocuments();
            return res.status(200).json({
                success: response ? true : false,
                coupon: response ? response : "Can not get coupon",
                totalCount: counts,
            });
        })
        .catch((err) => {
            if (err) throw new Error(err, message);
        });
});

const updateCoupon = asyncHandler(async (req, res) => {
    const { fid } = req.params;
    const updateCoupon = await Coupon.findByIdAndUpdate(fid, req.body, {
        new: true,
    });
    return res.status(200).json({
        success: updateCoupon ? true : false,
        message: updateCoupon ? "Updated" : "Can not update Coupon",
    });
});
const deleteCoupon = asyncHandler(async (req, res) => {
    const { fid } = req.params;
    const deleteCoupon = await Coupon.findByIdAndDelete(fid);
    return res.status(200).json({
        success: deleteCoupon ? true : false,
        message: deleteCoupon ? "Deleted" : "Can not delete Coupon",
    });
});
const createCouponPitchOwner = asyncHandler(async (req, res) => {
    const { title, price, owner } = req.body;
    if (!title || !price || !owner) throw new Error("Missing inputs");
    const user = await User.findById(owner);
    const couponData = {
        title,
        price,
        owner: owner,
        role: user.role // Assigning the user's role to the coupon
    };
    const response = await Coupon.create(couponData);

    return res.json({
        success: response ? true : false,
        mes: response ? "Create Coupon Success" : "Fail!!!",
        userRole: user ? user.role : null // Return the user's role or null if user is not found
    });
});
module.exports = {
    createCoupon,
    getCoupon,
    getAllCoupon,
    getCouponAdmin,
    updateCoupon,
    deleteCoupon,
    createCouponPitchOwner
};
