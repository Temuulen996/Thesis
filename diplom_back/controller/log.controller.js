const asyncHandler = require("../middleware/asyncHandler");
const Log = require("../models/log");

exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Log.find();
  res.status(200).send({ success: true, data: data });
});
exports.findByID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Log.findById(id);
  res.status(200).send({ success: true, data: data });
});
exports.deleteByID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await Log.findByIdAndDelete(id);
  res.status(200).send({ success: true });
});
