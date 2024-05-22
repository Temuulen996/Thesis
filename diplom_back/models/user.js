const mongoose = require("mongoose");
var CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");
const ShoppingCart = require("./shopping_cart");
const CartItem = require("./cart_item");
const FeedBack = require("./feedback");
const Payment = require("./payment");
const Log = require("./log");
const Donation = require("./donation");
const TOKEN_EXPIRATION = "30d";
const UserSchema = mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Хэрэглэгчийн нэр заавал оруулна уу.."],
  },
  lname: {
    type: String,
    required: [true, "Хэрэглэгчийн овог заавал оруулна уу..."],
  },
  picture: { type: String },
  phone_number: { type: String },
  email: {
    type: String,
    required: [true, "Хэрэглэгчийн Email заавал оруулна уу.."],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email хаяг буруу байна.",
    ],
  },
  role: { type: String, required: true, enum: ["user"] },
  password: {
    type: String,
    minlength: 4,
    required: [true, "Хэрэглэгчийн нууц үг заавал оруулна уу.."],
  },
  address: {
    type: String,

    maxlength: [300, "хамгийн ихдээ 300 тэмдэгт оруулна уу.."],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  created_date: { type: Date, default: Date.now },
});
UserSchema.pre("save", async function () {
  // var salt = bcrypt.genSaltSync(10);
  // this.password = bcrypt.hashSync(this.password, salt);

  // console.log(this.password);
  // var salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt);
  this.password = CryptoJS.AES.encrypt(
    this.password,
    process.env.PASSWORD_SECRET_KEY
  ).toString();
  console.log(this.password);
});
UserSchema.pre("remove", async function (next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  await CartItem.deleteMany({ user_id: this._id }).exec();
  await FeedBack.deleteMany({ user_id: this._id }).exec();
  await Payment.deleteMany({ user_id: this._id }).exec();
  await Log.deleteMany({ user_id: this._id }).exec();
  await Donation.updateMany({ user_id: this._id }, { user_id: "" });
});
UserSchema.methods.getJWT = function () {
  const token = jwt.sign({ id: this._id }, "ECOMMERCE_CLOTHES", {
    expiresIn: TOKEN_EXPIRATION,
  });
  return token;
};
//хэрэглэгчийн password-ийг шалгах function
UserSchema.methods.checkPassword = async function (enteredPassword) {
  var bytes = CryptoJS.AES.decrypt(
    this.password,
    process.env.PASSWORD_SECRET_KEY
  );
  const pass = bytes.toString(CryptoJS.enc.Utf8);
  return pass === enteredPassword;
  // return await bcrypt.compare(enteredPassword, pass);
};

const User = mongoose.model("User", UserSchema);
module.exports = module.exports = mongoose.models.User || User;
