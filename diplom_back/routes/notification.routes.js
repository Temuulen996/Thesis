const express = require("express");
const {
  CreateUserToken,
  GetAllUserToken,
} = require("../controller/notification.controller");

const router = express.Router();

router.route("/token").get(GetAllUserToken).post(CreateUserToken);
module.exports = router;
