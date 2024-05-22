const asyncHandler = require("../middleware/asyncHandler");
const Donation = require("../models/donation");

exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Donation.find();
  res.status(200).send({ success: true, data: data });
});
exports.findByID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Donation.findById(id);
  res.status(200).send({ success: true, data: data });
});
exports.createDonation = asyncHandler(async (req, res, next) => {
  const newData = req.body;
  await Donation.create(newData);
  res.status(200).send({ success });
});
exports.findByProductID = asyncHandler(async (req, res, next) => {
  const id = req.params.productID;
  const data = await Donation.find({ product_id: id });
  res.status(200).send({ success: true, data: data });
});
exports.findByUserID = asyncHandler(async (req, res, next) => {
  const id = req.params.userID;
  const data = await Donation.find({ user_id: userID });
  res.status(200).send({ success: true, data: data });
});
