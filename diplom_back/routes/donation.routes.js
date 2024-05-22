const express = require("express");
const {
  findAll,
  findByUserID,
  findByProductID,
} = require("../controller/donation.controller");
const router = express.Router();

router.route("/user/:userID").get(findByUserID);
router.route("/product/:productID").get(findByProductID);
router.route("/").get(findAll).post();
module.exports = router;
