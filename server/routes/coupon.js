const router = require("express").Router();
const ctrls = require("../controllers/coupon");
const { verifyAccessToken, isAdmin, isAdminAndPitchOwn } = require("../middlewares/verifyToken");


router.post("/", [verifyAccessToken, isAdmin], ctrls.createCoupon);
router.post("/po", [verifyAccessToken, isAdminAndPitchOwn], ctrls.createCouponPitchOwner);
router.post("/update", ctrls.getCoupon);
router.get("/", ctrls.getAllCoupon);
router.get("/couponadmin", [verifyAccessToken, isAdminAndPitchOwn], ctrls.getCouponAdmin);
router.put("/:fid", [verifyAccessToken, isAdminAndPitchOwn], ctrls.updateCoupon);
router.delete("/:fid", [verifyAccessToken, isAdminAndPitchOwn], ctrls.deleteCoupon);


module.exports = router;
