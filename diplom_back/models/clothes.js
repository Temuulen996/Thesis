const mongoose = require("mongoose");
const CartItem = require("./cart_item");
const Donation = require("./donation");
const ClothesSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Category",
  },
  buy_price: { type: Number, required: true },
  price: {
    type: Number,
    required: true,
  },
  used_month: { type: Number, required: true, min: 0, max: 200 },
  status: {
    type: String,
    required: true,
    enum: ["Old", "Very old", "Used", "Well worn", "New"],
  },
  gender: { type: String, required: true, enum: ["M", "FM", "BTH"] },
  size: { type: String, required: true, enum: ["S", "M", "L", "XL", "XXL"] },
  rating: {
    type: Number,
    required: true,
    min: [50, "Үнэлгээ ядаж 50% байх ёстой."],
    max: [101, "Үнэлгээ ихдээ 100% байх ёстой."],
  },

  type: { type: String, required: true, enum: ["donation", "sell item"] },
  images: { type: [String], required: true },
  isSold: { type: Boolean, required: true, default: false },
  isAvailableToSell: { type: Boolean, required: true, default: true },
  review: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now },
});
ClothesSchema.pre("remove", async function (next) {
  await CartItem.deleteMany({ clothes_id: this._id }).exec(); //changes
  // await Payment.deleteMany({ clothes_id: this._id }).exec();
  // await Donation.updateMany({ clothes_id: this._id }).exec();
});
const Clothes = mongoose.model("Clothes", ClothesSchema);
module.exports = Clothes;
