const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/category");

exports.create = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const data = new Category({ name });
  await data.save();
  res.status(200).send({ success: true, category: data });
});
exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Category.find();
  res.status(200).send({ success: true, data });
});
