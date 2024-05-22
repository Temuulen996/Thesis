const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
