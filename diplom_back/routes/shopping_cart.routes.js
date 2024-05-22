const express = require("express");
const {
  insertIntoItemList,
  findAll,
  findByUserId,
} = require("../controller/shopping_cart.controller");
const { protect } = require("../middleware/protect");

const router = express.Router();

router
  .route("/owner")
  .get(protect, findByUserId)
  .post(protect, insertIntoItemList);
router.route("/").get(findAll).post();
module.exports = router;
