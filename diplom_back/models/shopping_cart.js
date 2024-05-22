const mongoose = require("mongoose");
const ShoppingCartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  items: {
    type: [mongoose.Schema.ObjectId],
    ref: "Clothes",
  },
  created_at: { type: Date, default: Date.now },
  amount: { type: Number, default: 0 },
});

const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema);

module.exports = ShoppingCart;
