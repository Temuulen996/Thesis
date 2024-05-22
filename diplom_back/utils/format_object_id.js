const mongoose = require("mongoose");
exports.formatStringToObject = (str) => {
  return mongoose.Types.ObjectId(str);
};
