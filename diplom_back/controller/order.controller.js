const asyncHandler = require("../middleware/asyncHandler");
const CartItem = require("../models/cart_item");
const Clothes = require("../models/clothes");
const Order = require("../models/order");

const Payment = require("../models/payment");

exports.create = asyncHandler(async (req, res, next) => {
  const data1 = await Payment.create({
    total: req.body.amounts.total,
    sub_total: req.body.amounts.sub_total,
    address: req.body.delivery_address,
    email: req.body.email,
    phone_number: req.body.phone_number,
    status: "Paid",
  });
  const estimated = new Date();
  estimated.setDate(estimated.getDate() + 2);
  const data = await Order.create({
    user: req.user._id,
    payment: data1._id,
    items: req.body.items?.map?.((el) => el.clothes_id._id),
    estimated_date: estimated,
  });
  console.log(data.items);
  await Clothes.updateMany(
    {
      _id: { $in: data.items },
    },
    { isSold: true, isAvailableToSell: false }
  );
  await CartItem.deleteMany({
    clothes_id: { $in: data.items },
  });
  res.status(200).send({ success: true, data });
});
exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Order.find()
    .populate("payment")
    .populate("items")
    .populate("user")
    .sort({ date: -1 });
  res.status(200).send({ success: true, data });
});
exports.findByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const data = await Order.find({ user: userId })
    .populate("payment")
    .populate("items");
  res.status(200).send({ success: true, data: data });
});
exports.getOrderDataByMonth = asyncHandler(async (req, res, next) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const pipeline = [
    {
      $match: {
        date: {
          $gte: new Date(`${currentYear}-01-01`),
          $lt: new Date(`${currentYear + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$date" }, // Group by month
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1, // Sort by month
      },
    },
    {
      $project: {
        month: "$_id", // Rename 'month' field
        count: 1, // Include 'count' field
      },
    },
  ];

  // Execute the aggregation query
  const data = await Order.aggregate(pipeline);
  data?.map?.((el) => {
    if (el.month == 1) el.month = "January";
    if (el.month == 2) el.month = "February";
    if (el.month == 3) el.month = "March";
    if (el.month == 4) el.month = "April";
    if (el.month == 5) el.month = "May";
    if (el.month == 6) el.month = "June";
    if (el.month == 7) el.month = "July";
    if (el.month == 8) el.month = "August";
    if (el.month == 9) el.month = "September";
    if (el.month == 10) el.month = "October";
    if (el.month == 11) el.month = "November";
    if (el.month == 12) el.month = "December";
  });

  console.log(data);
  res.status(200).send({ success: true, data });
});
exports.updateOrderDataById = asyncHandler(async (req, res, next) => {
  let newData = { ...req.body };
  delete newData.id;
  delete newData.user;
  delete newData.sub_total;
  delete newData.total;
  delete newData.address;
  delete newData.email;
  delete newData.phone_number;
  delete newData.date;
  delete newData.estimated_date;
  const order = await Order.findById(req.body.id);
  order.status = newData.delivery_status;

  const payment = await Payment.findById(order.payment);
  payment.status = newData.payment_status;
  await payment.save();
  await order.save();
  res.status(200).send({ success: true });
});
exports.Update = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  let doc = await Order.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body }
  );
  console.log(doc);
  res.status(200).send({ success: true });
});
exports.deleteByID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const doc = await Order.findById(id);
  const ress = await Order.deleteOne({ _id: id });
  //payment ustgah
  // await Payment.deleteOne({ _id: doc?.payment }); //changes
  // await doc.remove();
  //payment ustgah
  // const ress = await Order.deleteOne({
  //   _id: id,
  // });
  res.status(200).send({ success: true, data: ress });
});
