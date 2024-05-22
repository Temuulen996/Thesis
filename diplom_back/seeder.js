// const fs = require("fs");
// const mongoose = require("mongoose");
// const colors = require("colors");
// const dotenv = require("dotenv");
// const Category = require("./models/Category");
// const Book = require("./models/Book");

// dotenv.config({ path: "./config/config.env" });

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const categories = JSON.parse(
//   fs.readFileSync(__dirname + "/data/category.json", "utf-8")
// );
// const books = JSON.parse(
//   fs.readFileSync(__dirname + "/data/book.json", "utf-8")
// );
// const importData = async () => {
//   try {
//     await Category.create(categories);
//     await Book.create(books);
//   } catch (err) {
//     console.log(err);
//   }
// };
// const deleteData = async () => {
//   try {
//     await Category.deleteMany();
//     await Book.deleteMany();
//   } catch (err) {
//     console.log(err);
//   }
// };

// if (process.argv[2] === "-i") {
//   importData();
//   console.log("Өгөгдлийг import хийсэн".green.inverse);
// } else if (process.argv[2] === "-d") {
//   deleteData();
//   console.log("Өгөгдлийг устгасан".red.inverse);
// }
