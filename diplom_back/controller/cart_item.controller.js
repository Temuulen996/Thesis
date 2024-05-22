const Cart = require("../models/cart_item");
const asyncHandler = require("../middleware/asyncHandler");

//сагсан доторх бүх хувцсыг илгээх controller
exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Cart.find();
  res.status(200).send({ success: true, data: data });
});
//сагсан дотроос хувцсыг id-аар нь олон front-руу илгээх controller.
exports.findById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Cart.findById(id);
  res.status(200).send({ success: true, data: data });
});
//сагсан дотроос хувцсыг id-аар нь олон front-руу илгээх controller.
exports.findByOwnerId = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  const data = await Cart.find({ user_id: userId })
    .populate("clothes_id")
    .populate("user_id");
  const countOfCartItem = await Cart.count({ user_id: userId });
  res.status(200).send({ success: true, data, countOfCartItem });
});
//сагсан дотор хувцсыг product_id болон сагсалсан хэрэглэгчийн id-г ашиглан нэмэх controller.
exports.create = asyncHandler(async (req, res, next) => {
  console.log("ajillaaa");
  let newItem = req.body;
  newItem.user_id = req.user._id;
  const cart = await Cart.create(newItem);
  const countOfCartItem = await Cart.count({ user_id: newItem.user_id });
  const data = await Cart.find({ user_id: newItem.user_id })
    .populate("clothes_id")
    .populate("user_id");
  res.status(200).send({ success: true, data, countOfCartItem });
});
//сагсан дотроос хувцсыг cart_item_id ашиглан устгах controller.
exports.remove = asyncHandler(async (req, res, next) => {
  let id = req.body.id;
  console.log(req.body);
  console.log(id);

  const cart = await Cart.findByIdAndDelete(id);

  res.status(200).send({ success: true, cart });
});
//сагсан дотроос бүх хувцсыг устгах controller.
exports.removeAll = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);
  const count = await Cart.deleteMany({ user_id: req.user._id });
  res.status(200).send({ success: true });
});
//сагсан ямар нэг product_id-тай хувцас байгаа эсэхийг шалгах controller.
exports.inCart = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const count = await Cart.countDocuments({
    clothes_id: id,
    user_id: req.user._id,
  });
  if (count == 0) res.status(200).send({ success: true, inCart: false });
  else {
    res.status(200).send({ success: true, inCart: true });
  }
});
