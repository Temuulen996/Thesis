const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema(
  {
    token: { type: String, required: true },
    user_id: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);
const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;
