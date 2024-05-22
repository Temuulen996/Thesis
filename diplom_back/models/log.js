const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Хэрэглэгчийн мэдээлэл шаардлагатай!"],
  },
  action: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", LogSchema);
module.exports = Log;
