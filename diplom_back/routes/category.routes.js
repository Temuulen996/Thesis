const express = require("express");
const { create, findAll } = require("../controller/category.controller");
const router = express.Router();
router.route("/").get(findAll).post(create);
module.exports = router;
