const mongoose = require("mongoose");
const Payment = require("./payment");
const OrderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  date: { type: Date, default: Date.now },

  status: {
    type: String,
    required: true,
    enum: ["Pending", "Complete", "Cancelled"],
    default: "Pending",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  items: {
    type: [mongoose.Schema.ObjectId],
    required: true,
    ref: "Clothes",
  },
  estimated_date: { type: Date },
});
OrderSchema.pre("deleteOne", async function (document, next) {
  console.log(document);
  try {
  } catch (err) {
    next(err);
  }
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
