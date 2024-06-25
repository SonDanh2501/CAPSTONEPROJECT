const Notification = require("../models/notification");
const User = require("../models/user");
const Pitch = require("../models/pitch");

const asyncHandler = require("express-async-handler");

const createNotfication = asyncHandler(async (req, res) => {
    const { title, owner, role } = req.body;
    if (!title || !owner || !role) throw new Error("Missing inputs");
    // const user = await User.findById(owner);
    const newNotification = {
      title: title,
      owner: owner,
      role: role,
    };
    const response = await Notification.create(newNotification);
    return res.json({
      success: response ? true : false,
      mes: response ? "Create notification success" : "Fail!!!",
      userRole: role ? role : "Fail !!!", // Return the user's role or null if user is not found
    });
});

const getAllNotification = asyncHandler(async (req,res) => {
  const queries = { ...req.query };
  console.log("CHECK OWNER", queries);
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
const getAllFavoriteNotification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Mảng phụ
  let responseNotification = [];
  const findUserWishList = await User.findById(userId).select("wishlist");
  await Promise.all(
    findUserWishList?.wishlist.map(async (pitch) => {
      // Convert object id into string
      let ConvertPitchId = pitch.toString();
      // Tìm owner id của sân trong wishlist
      let findOwner = await Pitch.findById(ConvertPitchId).select("owner");
      // Tìm notification có id owner = owner id vừa tìm được
      let response = await Notification.find({
        owner: findOwner?.owner,
      }).populate({
        path: "owner",
        select: "firstname lastname avatar",
      });      ;
      // Đẩy các giá trị tìm được vào một mảng:
      responseNotification.push(response[0]);
    })
  );
  return res.json({
    success: responseNotification.length > 0 ? true : false,
    notification:
      responseNotification.length > 0
        ? responseNotification
        : "Can not get data",
  });
});
const UpdateNotification = asyncHandler(async (req,res) => {
  const { noid } = req.params;
  console.log("CHECK PARAM >>> ", noid);
  const updateNotification = await Notification.findByIdAndUpdate(noid, req.body, {
      new: true,
  });
  return res.status(200).json({
      success: updateNotification ? true : false,
      message: updateNotification ? "Updated" : "Can not update Coupon",
  });
})
module.exports = {
    createNotfication,
    getAllNotification,
    getAllFavoriteNotification,
    UpdateNotification
};
