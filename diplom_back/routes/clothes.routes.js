const express = require("express");
const {
  findAll,
  createClothes,
  findById,
  findByOwnerId,
  findNewClothes,
  filterClothes,
  findAllWithoutFilter,
  deleteClothesById,
  getBarChartData,
  getPieChartData,
  updateClothingDataById,
  getHomePageClothesInfo,
} = require("../controller/clothes.controller");

const { protect } = require("../middleware/protect");

const router = express.Router();

router.route("/all").get(findAllWithoutFilter);
router.route("/home_clothes_info").get(getHomePageClothesInfo);
router.route("/piechart").get(getPieChartData);
router.route("/new_clothes").get(findNewClothes);
router.route("/filter").get(filterClothes);
router.route("/owner/:id").get(findByOwnerId);
router
  .route("/:id")
  .get(findById)
  .delete(deleteClothesById)
  .put(updateClothingDataById);
router.route("/").get(findAll).post(createClothes);

module.exports = router;
