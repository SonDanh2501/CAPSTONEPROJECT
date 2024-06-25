const router = require("express").Router();
const ctrls = require("../controllers/notification");
const { verifyAccessToken, isAdmin, isAdminAndPitchOwn } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinaryconfig");

router.post("/", [verifyAccessToken, isAdminAndPitchOwn], ctrls.createNotfication);
router.get("/", verifyAccessToken, ctrls.getAllNotification);
router.get(
  "/favorite/:userId",
  verifyAccessToken,
  ctrls.getAllFavoriteNotification
);

router.put("/:noid", verifyAccessToken, ctrls.UpdateNotification);

module.exports = router;
