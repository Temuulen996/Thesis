const express = require("express");
const { findAll, create } = require("../controller/feedback.controller");
const { protect } = require("../middleware/protect");
const router = express.Router();
router.route("/").get(protect, findAll).post(protect, create);
module.exports = router;
