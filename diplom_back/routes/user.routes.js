const express = require("express");
const {
  findAll,
  findById,
  create,
  login,
  findLoggedUser,
  updateUserInfo,
  recoverPassword,
} = require("../controller/user.controller");
const {
  addToWishlist,
  removeFromWishlist,
} = require("../controller/user.controller");
const { protect } = require("../middleware/protect");

const router = express.Router();

router.route("/login").post(login);
router.route("/logged_user").get(protect, findLoggedUser);
router.route("/update_user_info").post(protect, updateUserInfo);
router.route("/wishlist/add/:id").put(addToWishlist);
router.route("/wishlist/remove/:id").put(removeFromWishlist);
router.route("/recover_request").post(recoverPassword);
router.route("/").get(protect, findAll).post(create);
router.route("/:id").get(findById);
module.exports = router;
