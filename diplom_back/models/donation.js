const mongoose = require("mongoose");
const DonationSchema = mongoose.Schema({
  clothes_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Clothes",
  },
  user_id: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
});
const Donation = mongoose.model("Donation", DonationSchema);
module.exports = Donation;
