const News = require("../models/news");
const asyncHandler = require("express-async-handler");

const createNews = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;
  const thumb = req.files.thumb[0].path;
  const image = req.files.image[0].path;

  if (!title || !description || !content) throw new Error("Missing inputs");

  if (thumb) req.body.thumb = thumb;
  if (image) req.body.image = image;

  const newNews = await News.create(req.body);
  return res.status(200).json({
    success: newNews ? true : false,
    createdNews: newNews ? newNews : "Can not create new News",
  });
});
// update views
const getNewsById = asyncHandler(async (req, res) => {
  const { nid } = req.params;
  const news = await News.findOneAndUpdate(
    { _id: nid, sysFlag: 1 },
    { $inc: { views: 1 } },
    { new: true }
  );
  return res.status(200).json({
    success: news ? true : false,
    newsData: news ? news : "Can not get news",
  });
});

const getAllNews = asyncHandler(async (req, res) => {
  const news = await News.find({ sysFlag: 1 });
  return res.status(200).json({
    success: news ? true : false,
    newsData: news ? news : "Can not get news",
  });
});
//filtering , sorting & pagination

const getNews = asyncHandler(async (req, res) => {
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
  let queryCommand = News.find(formartedQueries);
  //Sorting

  if (req.query.queries?.sort) {
    const sortBy = req.query.queries?.sort.split(",").join(" ");
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
      const counts = await News.find(formartedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        news: response ? response : "Can not get news",
        totalCount: counts,
      });
    })
    .catch((err) => {
      if (err) throw new Error(err, message);
    });
});

const updateNews = asyncHandler(async (req, res) => {
  const { nid } = req.params;
  const files = req?.files;

  if (files?.thumb) {
    req.body.thumb = files?.thumb[0].path;
  }

  if (files?.image) {
    req.body.image = files?.image[0].path;
  }

  const updateNews = await News.findByIdAndUpdate(nid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updateNews ? true : false,
    message: updateNews ? "Updated" : "Can not update news",
  });
});

const deleteNews = asyncHandler(async (req, res) => {
  const { nid } = req.params;
  const deleteNews = await News.findByIdAndDelete(nid);
  return res.status(200).json({
    success: deleteNews ? true : false,
    message: deleteNews ? "Deleted" : "Can not delete news",
  });
});
const deleteNewsFlag = asyncHandler(async (req, res) => {
  const { nid } = req.params;
  const deleteNews = await News.findByIdAndUpdate(
    nid,
    { sysFlag: 0 },
    { new: true }
  );
  return res.status(200).json({
    success: deleteNews ? true : false,
    message: deleteNews ? "Deleted" : "Can not delete news",
  });
});

module.exports = {
  createNews,
  getNewsById,
  updateNews,
  deleteNews,
  deleteNewsFlag,
  getAllNews,
  getNews,
};
