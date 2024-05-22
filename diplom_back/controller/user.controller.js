const { cloudinary } = require("../config/cloudinary_config");
const { upload } = require("../config/multer_config");
const asyncHandler = require("../middleware/asyncHandler");
const CryptoJS = require("crypto-js");
const User = require("../models/user");
const mongoose = require("mongoose");
const path = require("path");
const CustomError = require("../utils/errorObject");
const ShoppingCart = require("../models/shopping_cart");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// let guid = () => {
//   let s4 = () => {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   };
//   return (
//     s4() +
//     s4() +
//     "-" +
//     s4() +
//     "-" +
//     s4() +
//     "-" +
//     s4() +
//     "-" +
//     s4() +
//     s4() +
//     s4()
//   );
// };

exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await User.find().sort({ created_date: -1 });
  res.status(200).send({ success: true, data: data });
});
exports.findById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await User.findById(id);
  res.status(200).send({ success: true, data: data });
});
exports.findLoggedUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  var bytes = CryptoJS.AES.decrypt(
    req.user.password,
    process.env.PASSWORD_SECRET_KEY
  );
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const data = await User.findById(userId);
  data.password = decryptedData;
  console.log("🚀 ~ exports.findLoggedUser=asyncHandler ~ data:", data);

  res.status(200).send({ success: true, data });
});
exports.create = asyncHandler(async (req, res, next) => {
  const newUser = req.body;
  //signup хийж буй бүх хэрэглэгч user role-той байна.
  newUser.role = "user";
  const user = await User.create(newUser);
  // await ShoppingCart.create({ user: user._id, items: [], amount: 0 });j
  //хэрэглэгчийн token-ийг үүсгэн өгөх.
  const token = user.getJWT();
  res.status(200).send({ success: true, user: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  // email, password-ийн аль нэг байхгүй бол exception шиднэ.
  if (!email || !password) {
    throw new CustomError(" email nuuts ug damjuuln uu..", 400);
  }
  //хэрэглэгчийг хайж олох хэсэг
  const user = await User.findOne({ email }).select("+password");
  //email-ээр нь user-ийг шүүх үед хэрэглэгч олдохгүй бол exception шиднэ.
  if (!user) {
    throw new CustomError("email nuuts ugiin ali neg buruu baina..", 400);
  }
  //mongoose-ийн нэг гайхалтай боломж нь schema-даа method бичиж өгч болдог ба энэ боломжийг ашиглан password-ийг шалгах method бичсэн. Түүнийгээ ашиглан password зөв эсэхийг шалгаж буруу бол exception шиднэ.
  const ok = await user.checkPassword(password);
  if (!ok) {
    throw new CustomError("email nuuts ugiin ali neg buruu baina..", 400);
  }
  //хэрэв бүх шалгалтыг давсан бол JWT буюу хэрэглэгчийн token буцааж өгнө. дараа нь хэрэглэгч энэ token-ийг ашиглан server-ээс data авна.
  const token = user.getJWT();
  res
    .status(200)
    .send({ success: true, login: true, user: user, token: token });
});

exports.addToWishlist = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let newData = req.body.id;
  newData = mongoose.Types.ObjectId(req.body.id);
  const prevData = await User.findById(id);
  const prevWishlist = prevData.wishlist;
  const newWishlist = [...prevWishlist, newData];
  await User.findOneAndUpdate({ _id: id }, { wishlist: newWishlist });
  res.status(200).send({ success: true });
  // PersonModel.update({ _id: person._id }, { $push: { friends: friend } }, done);
});

exports.removeFromWishlist = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let newData = req.body.id;
  newData = mongoose.Types.ObjectId(req.body.id);
  const prevData = await User.findById(id);
  const prevWishlist = prevData.wishlist;
  let newWishlist = [];
  prevWishlist.map((item) => {
    if (newData.toString() != item.toString()) {
      newWishlist.push(item);
    }
  });

  await User.findOneAndUpdate({ _id: id }, { wishlist: newWishlist });
  res.status(200).send({ success: true });
});
exports.updateUserInfo = asyncHandler(async (req, res, next) => {
  const newPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.PASSWORD_SECRET_KEY
  ).toString();
  console.log(req.body);
  const data = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      password: newPassword,
      address: req.body.address,
      phone_number: req.body.phoneNumber
    }
  );
  res.status(200).send({ success: true, data });
});
const TOKEN_EXPIRATION = "30d";
exports.recoverPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.find({ email: email });
  if (!user) throw new CustomError("Хэрэглэгч олдсонгүй.", 400);
  const token = jwt.sign({ userId: user._id }, "ECOMMERCE_CLOTHES", {
    expiresIn: TOKEN_EXPIRATION,
  });
  const transporter = nodemailer.createTransport({
    /* transport config */
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "temuulenuuree@gmail.com",
      pass: "Temuuka12",
    },
  });
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  await transporter.sendMail({
    from: '"Your App" <support@Ethrift.com>',
    to: user.email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetLink}">here</a> Нууц үг сэргээх</p>`,
  });
  res.status(200).send({ success: true, data: user });
});
