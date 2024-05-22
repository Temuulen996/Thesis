const asyncHandler = require("../middleware/asyncHandler");
const Payment = require("../models/payment");

exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Payment.find();
});
exports.create = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const data = await Payment.create();
  res.status(200).send({ success: true, data });
});
