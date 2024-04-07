const router = require("express").Router();
const ctrls = require("../controllers/news");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinaryconfig");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploader.fields([
    { name: "image", maxCount: 1 },
    { name: "thumb", maxCount: 1 },
  ]),
  ctrls.createNews
);

router.get("/", ctrls.getNews);

router.put(
  "/:nid",
  [verifyAccessToken, isAdmin],
  uploader.fields([
    { name: "image", maxCount: 1 },
    { name: "thumb", maxCount: 1 },
  ]),
  ctrls.updateNews
);

router.delete("/:nid", [verifyAccessToken, isAdmin], ctrls.deleteNews);

router.get("/:nid", ctrls.getNewsById);

module.exports = router;
