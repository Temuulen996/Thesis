const asyncHandler = require("../middleware/asyncHandler");
const FeedBack = require("../models/feedback");

exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await FeedBack.find();
  res.status(200).send({ success: true, data });
});
exports.create = asyncHandler(async (req, res, next) => {
  const newData = req.body.feedback;
  const userId = req.user._id;
  if (newData.type == 0) newData.type = "Таалагдсан";
  if (newData.type == 1) newData.type = "Таалагдүй";
  if (newData.type == 2) newData.type = "Шинэ санаа";
  newData.user = userId;
  console.log(newData);
  const data = await FeedBack.create(newData);

  res.status(200).send({ success: true, data });
});
exports.findByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.params.user_id;
  const data = await FeedBack.find({ user_id: userId });
  res.status(200).send({ success: true, data });
});
