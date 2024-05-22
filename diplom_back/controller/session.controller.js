const asyncHandler = require("../middleware/asyncHandler");
const Session = require("../models/session");
var rand = function () {
  return Math.random().toString(36).substr(2); // remove `0.`
};

var Token = function () {
  return rand() + rand(); // to make it longer
};
exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Session.find();
  res.status(200).send({ success: true, data: data });
});
exports.findByToken = asyncHandler(async (req, res, next) => {
  const token = req.params.token;
  const data = await Session.find({ token: token });
  res.status(200).send({ success: true, data: data });
});
exports.findByUserID = asyncHandler(async (req, res, next) => {
  const userID = req.params.id;
  const data = await Session.find({ user_id: userID });
  res.status(200).send({ success: true, data: data });
});
// exports.findByUserID = asyncHandler(async (req, res, next) => {
//   const userID = req.params.id;
//   const data = await Session.find({ userID: userID });
//   res.status(200).send({success : true , data : data});}

exports.create = asyncHandler(async (req, res, next) => {
  const userID = req.body.userID;
  const token = Token();
  const data = Session.create({ token: token, user_id: userID });
  res.status(200).send({ success: true });
});
