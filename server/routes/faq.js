const router = require("express").Router();
const ctrls = require("../controllers/faq");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createFaq);

router.get("/", ctrls.getFaqs);

router.put("/:fid", [verifyAccessToken, isAdmin], ctrls.updateFaq);

router.delete("/:fid", [verifyAccessToken, isAdmin], ctrls.deleteFaq);

router.get("/:fid", ctrls.getFaqById);

module.exports = router;
