const mongoose = require("mongoose");

const FeedBackSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  email: {
    type: String,
    required: [true, "Хэрэглэгчийн Email заавал оруулна уу.."],

    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email хаяг буруу байна.",
    ],
  },
  type: { type: String, required: true },
  category: { type: String, required: true },
  feedback: { type: String, required: true },
});
const FeedBack = mongoose.model("FeedBack", FeedBackSchema);
module.exports = FeedBack;
