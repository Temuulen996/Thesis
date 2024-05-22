const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const myError = require("../utils/errorObject");
const User = require("../models/user");
//API-уудыг хамгаалах middleware.
exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new myError(
      "энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна та login хийнэ үү..",
      400
    );
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new myError("token байхгүй байна..", 400);
  }
  //jwt сангийн тусгай verify function-ийг ашиглан өөрийн үүсгэсэн ECOMMERCE_CLOTHES гэсэн key-ээр шалган зөв бол req object-доо хэрэглэгчийн мэдээллийг хамтад нь явуулна.
  const tokenObj = jwt.verify(token, "ECOMMERCE_CLOTHES");
  req.user = await User.findById(tokenObj.id);
  next();
});
