const express = require("express");
const {
  create,
  findAll,
  findByUserId,
  getOrderDataByMonth,
  updateOrderDataById,
  deleteByID,
  Update,
} = require("../controller/order.controller");
const { protect } = require("../middleware/protect");
const router = express.Router();

router.route("/user").get(protect, findByUserId);
router.route("/get_orderdata_by_month").get(getOrderDataByMonth);
router.route("/status/:id").put(Update);
router.route("/").get(findAll).post(protect, create);
router.route("/:id").put(updateOrderDataById).delete(deleteByID);
module.exports = router;
