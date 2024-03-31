const router = require("express").Router();
const ctrls = require("../controllers/coupon");


router.post("/", ctrls.createCoupon);
router.post("/update", ctrls.getCoupon);

module.exports = router;
