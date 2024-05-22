const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Category давхцаж болохгүй.."],
  },
});
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
