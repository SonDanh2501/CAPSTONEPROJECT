const useRouter = require("./user");
const pitchRouter = require("./pitch");
const pitchCategoryRouter = require("./pitchCategory");
const brand = require("./brand");
const bookingRouter = require("./booking");
const newsRouter = require("./news");
const faqRouter = require("./faq");
const couponRouter = require("./coupon");
const notificationRouter = require("./notification");
const { notFound, errHandler } = require("../middlewares/errorHandler");

const initRoutes = (app) => {
  app.use("/api/user", useRouter);
  app.use("/api/pitch", pitchRouter);
  app.use("/api/pitchcategory", pitchCategoryRouter);
  app.use("/api/brand", brand);
  app.use("/api/coupon", couponRouter);
  app.use("/api/booking", bookingRouter);
  app.use("/api/news", newsRouter);
  app.use("/api/faq", faqRouter);
  app.use("/api/notification", notificationRouter);
  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
