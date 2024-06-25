const Notification = require("../models/notification");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");

const createNotfication = asyncHandler(async (req, res) => {
    const { title, owner } = req.body;
    if (!title || !owner) throw new Error("Missing inputs");
    const user = await User.findById(owner);
    const newNotification = {
      title,
      owner: owner,
      role: user.role, // Assigning the user's role to the coupon
    };
    const response = await Notification.create(newNotification);
    return res.json({
      success: response ? true : false,
      mes: response ? "Create notification success" : "Fail!!!",
      userRole: user ? user.role : null, // Return the user's role or null if user is not found
    });
});

const getAllNotification = asyncHandler(async (req,res) => {
    const response = await Notification.find().populate({
      path: "owner",
      select: "firstname lastname avatar",
    });      
    // const counts = await Notification.find(response).countDocuments();
    return res.json({
      success: response ? true : false,
      notification: response ? response : "Can not get data",
      // totalCount: counts,
    });
})

module.exports = {
    createNotfication,
    getAllNotification
};
