const express = require("express");
const {
  findAll,
  findByID,
  deleteByID,
} = require("../controller/log.controller");
const router = express.Router();

router.route("/:id").get(findByID).delete(deleteByID);
router.route("/").get(findAll);
module.exports = router;
