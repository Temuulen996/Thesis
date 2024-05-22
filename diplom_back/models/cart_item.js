const mongoose = require("mongoose");
const CartItemSchema = mongoose.Schema({
  clothes_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Clothes",
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});
const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
