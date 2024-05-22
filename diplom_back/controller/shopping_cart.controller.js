const asyncHandler = require("../middleware/asyncHandler");
const ShoppingCart = require("../models/shopping_cart");

exports.insertIntoItemList = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);
  console.log(req.body.clothes_id);
  const data = await ShoppingCart.updateOne(
    { user: req.user._id }, // Filter by product ID or some other identifier
    { $push: { items: req.body.clothes_id } } // Add new tag to the tags array
  );

  res.status(200).send({ success: true, data: data });
});
exports.removeFromItemList = asyncHandler(async (req, res, next) => {
  console.log(req.params.user_id);
  console.log(req.body.clothes_id);
  const data = await ShoppingCart.updateOne(
    { user: req.params.user_id }, // Filter by product ID or some other identifier
    { $pop: { items: req.body.clothes_id } } // Add new tag to the tags array
  );
  res.status(200).send({ success: true, data });
});
exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await ShoppingCart.find().populate("user").populate("items");
  res.status(200).send({ success: true, data });
});
exports.findByUserId = asyncHandler(async (req, res, next) => {
  const data = await ShoppingCart.find({ user: req.user._id }).populate(
    "items"
  );
  console.log(data[0].items);
  res.status(200).send({ success: true, data: data[0].items });
});
