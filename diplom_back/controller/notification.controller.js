const asyncHandler = require("../middleware/asyncHandler");
const Notification = require("../models/notification");
const { SendNotifications } = require("../services/notification");

exports.CreateUserToken = asyncHandler(async (req, res, next) => {
  const token = req.body.token;
  console.log("🚀 ~ exports.CreateNotification=asyncHandler ~ token:", token);
  let prev = [];
  prev = await Notification.find({ token: token });
  if (prev.length >= 1) {
    res.status(200).send({ success: false, message: "Бүртгэгдсэн байна." });
  } else {
    const response = await Notification.create({ token });
    res.status(200).send({
      success: true,
      response,
    });
  }
});
exports.GetAllUserToken = asyncHandler(async (req, res, next) => {
  const tokens = await Notification.find();
  await SendNotifications("omd");
  // console.log("🚀 ~ exports.GetAllUserToken=asyncHandler ~ tokens:", tokens);
  res.status(200).send({
    success: true,
  });
});
