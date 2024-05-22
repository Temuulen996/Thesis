const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  total: { type: Number, required: true },
  sub_total: { type: Number, required: true },
  method: { type: String, required: true, default: "Card" },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  status: {
    type: String,
    required: true,
    default: "Pending",
    enum: ["Paid", "Pending", "Cancelled"],
  },
  created_at: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
