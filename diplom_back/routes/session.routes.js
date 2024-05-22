const express = require("express");
const {
  findAll,
  create,
  findByToken,
} = require("../controller/session.controller");
const router = express.Router();

router.route("/:token").get(findByToken);
router.route("/").get(findAll).post(create);
module.exports = router;
