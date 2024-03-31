const Faq = require("../models/faq");
const asyncHandler = require("express-async-handler");

const createFaq = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) throw new Error("Missing inputs");

  const newFaq = await Faq.create(req.body);
  return res.status(200).json({
    success: newFaq ? true : false,
    createdFaq: newFaq ? newFaq : "Can not create new faq",
  });
});
// update views
const getFaqById = asyncHandler(async (req, res) => {
  const { fid } = req.params;
  const faq = await Faq.findOneAndUpdate({ _id: fid });
  return res.status(200).json({
    success: faq ? true : false,
    faqData: faq ? faq : "Can not get faq",
  });
});

//filtering , sorting & pagination

const getFaqs = asyncHandler(async (req, res) => {
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
  let queryCommand = Faq.find(formartedQueries);
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
      const counts = await Faq.find(formartedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        faq: response ? response : "Can not get faq",
        totalCount: counts,
      });
    })
    .catch((err) => {
      if (err) throw new Error(err, message);
    });
});

const updateFaq = asyncHandler(async (req, res) => {
  const { fid } = req.params;

  const updateFaq = await Faq.findByIdAndUpdate(fid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updateFaq ? true : false,
    message: updateFaq ? "Updated" : "Can not update faq",
  });
});

const deleteFaq = asyncHandler(async (req, res) => {
  const { fid } = req.params;
  const deleteFaq = await Faq.findByIdAndDelete(fid);
  return res.status(200).json({
    success: deleteFaq ? true : false,
    message: deleteFaq ? "Deleted" : "Can not delete faq",
  });
});

module.exports = {
  createFaq,
  getFaqById,
  getFaqs,
  updateFaq,
  deleteFaq,
};