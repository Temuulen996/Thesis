const express = require("express");
const { protect } = require("../middleware/protect");
const {
  findAll,
  create,
  findByOwnerId,
  inCart,
  remove,
  removeAll,
} = require("../controller/cart_item.controller");

const router = express.Router();
//API-уудыг protect middleware-ээр хамгаалсан байдал

router.route("/owner").get(protect, findByOwnerId);
router.route("/in_cart/:id").get(protect, inCart);
router.route("/remove").post(protect, remove);
router.route("/remove_all").post(protect, removeAll);
router.route("/").get(findAll).post(protect, create);
module.exports = router;
