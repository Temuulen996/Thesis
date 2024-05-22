const { cloudinary } = require("../config/cloudinary_config");
const asyncHandler = require("../middleware/asyncHandler");
const Clothes = require("../models/clothes");
const mongoose = require("mongoose");

const User = require("../models/user");
const CustomError = require("../utils/errorObject");
const { formatStringToObject } = require("../utils/format_object_id");
const Category = require("../models/category");
const CartItem = require("../models/cart_item");
const Order = require("../models/order");
const { SendNotifications } = require("../services/notification");
exports.findAllWithoutFilter = asyncHandler(async (req, res, next) => {
  const data = await Clothes.find()
    .populate("category_id")
    .sort({ created_date: -1 });
  res.status(200).send({
    success: true,
    data: data,
  });
});
exports.findAll = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const data = await Clothes.find({ isSold: false, isAvailableToSell: true })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category_id")
    .sort({ created_date: -1 });
  const count = await Clothes.countDocuments({
    isSold: false,
    isAvailableToSell: true,
  });
  const result = await Clothes.aggregate([
    {
      $match: {
        isSold: false,
        isAvailableToSell: true,
      },
    },
    {
      $group: {
        _id: null,
        maxPrice: { $max: "$price" },
        minPrice: { $min: "$price" },
      },
    },
  ]);

  res.status(200).send({
    success: true,
    data: data,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    minPrice: result[0] ? result[0].minPrice : 0,
    maxPrice: result[0] ? result[0].maxPrice : 0,
  });
});
exports.findById = asyncHandler(async (req, res, next) => {
  // const io = req.app.get("io");
  // io.emit("newNotification", {
  //   message: "asdasdasd",
  // });
  const id = req.params.id;
  await Clothes.findByIdAndUpdate(id, { $inc: { review: 1 } }, { new: true });
  const data = await Clothes.findById(id).populate("category_id");

  if (!data) {
    throw new CustomError(`iim id tai buteegdehuun baihgui baina.`, 400);
  }
  res.status(200).send({ success: true, data: data });
});
exports.createClothes = asyncHandler(async (req, res, next) => {
  const type = req.body.type;

  if (type === "web") {
    //web
    let newData = req.body;
    console.log(newData);

    // if (!mongoose.Types.ObjectId.isValid(newData.category_id)) {
    //   const cate = await Category.create({ name: newData.category_id });
    //   console.log(cate);
    //   newData.category_id = cate._id;
    // }a

    let uploadedImages = [];
    if (!Array.isArray(req.files?.images)) {
      uploadedImages.push(req.files?.images);
    } else {
      uploadedImages = req.files?.images;
    }
    console.log(
      "🚀 ~ exports.createClothes=asyncHandler ~ uploadedImages:",
      uploadedImages
    );
    const uploadPromises = uploadedImages?.map?.((image) =>
      cloudinary.uploader.upload(image.tempFilePath)
    );
    const uploadResults = await Promise.all(uploadPromises);
    console.log(
      "🚀 ~ exports.createClothes=asyncHandler ~ uploadResults:",
      uploadResults
    );
    newData.images = uploadResults.map((result) => result.secure_url);
    newData.type = "sell item";
    if (newData.used_month <= 3) newData.status = "New";
    if (newData.used_month <= 6 && newData.used_month > 3)
      newData.status = "Well worn";
    if (newData.used_month <= 10 && newData.used_month > 6)
      newData.status = "Used";
    if (newData.used_month <= 12 && newData.used_month > 10)
      newData.status = "Old";
    if (newData.used_month > 12) newData.status = "Very old";
    const buyPrice = newData.price;
    if (newData.price <= 30000)
      newData.price =
        parseFloat(newData.price) + parseFloat((5 * newData.price) / 100);
    if (newData.price <= 60000 && newData.price > 30000)
      newData.price =
        parseFloat(newData.price) + parseFloat((7 * newData.price) / 100);
    if (newData.price <= 100000 && newData.price > 60000)
      newData.price =
        parseFloat(newData.price) + parseFloat((9 * newData.price) / 100);
    if (newData.price > 100000)
      newData.price =
        parseFloat(newData.price) + parseFloat((11 * newData.price) / 100);
    console.log("price : ", Math.floor(newData.price / 100) * 100);
    newData.buy_price = parseFloat(buyPrice);
    console.log(newData);
    const data = await Clothes.create(newData);
    console.log("🚀 ~ exports.createClothes=asyncHandler ~ newData:", newData);
    await SendNotifications(newData.name);
    res.status(200).send({ success: true, price: newData.price });
  } else {
    //mobile
    let newData = req.body;

    if (!mongoose.Types.ObjectId.isValid(newData.category_id)) {
      const cate = await Category.create({ name: newData.category_id });
      console.log(cate);
      newData.category_id = cate._id;
    }

    let uploadedImages = [];
    if (!Array.isArray(req.body?.images)) {
      uploadedImages.push(`data:image/jpeg;base64,${req.body?.images}`);
    } else {
      uploadedImages = req.body?.images?.map?.((elem, i) => {
        return `data:image/jpeg;base64,${elem}`;
      });
    }

    const uploadPromises = uploadedImages?.map?.((image) =>
      cloudinary.uploader.upload(image, {
        overwrite: true,
        invalidate: true,
        width: 810,
        height: 456,
        crop: "fill",
        resource_type: "image",
      })
    );
    const uploadResults = await Promise.all(uploadPromises);

    newData.images = uploadResults.map((result) => result.secure_url);
    newData.type = "sell item";
    if (newData.used_month <= 3) newData.status = "New";
    if (newData.used_month <= 6 && newData.used_month > 3)
      newData.status = "Well worn";
    if (newData.used_month <= 10 && newData.used_month > 6)
      newData.status = "Used";
    if (newData.used_month <= 12 && newData.used_month > 10)
      newData.status = "Old";
    if (newData.used_month > 12) newData.status = "Very old";
    const buyPrice = newData.price;
    if (newData.price <= 30000)
      newData.price =
        parseFloat(newData.price) + parseFloat((5 * newData.price) / 100);
    if (newData.price <= 60000 && newData.price > 30000)
      newData.price =
        parseFloat(newData.price) + parseFloat((7 * newData.price) / 100);
    if (newData.price <= 100000 && newData.price > 60000)
      newData.price =
        parseFloat(newData.price) + parseFloat((9 * newData.price) / 100);
    if (newData.price > 100000)
      newData.price =
        parseFloat(newData.price) + parseFloat((11 * newData.price) / 100);

    newData.buy_price = parseFloat(buyPrice);

    const data = await Clothes.create(newData);
    SendNotifications(newData.name);
    res.status(200).send({ success: true });
  }
});
exports.findByOwnerId = asyncHandler(async (req, res, next) => {
  const ownewId = req.params.id;
  const ownerData = await User.findById(ownewId);
  console.log(ownerData);
  let data = await Clothes.find({ user_id: ownewId });
  // data = { ...data, owner_name: ownerData.fname };

  res.status(200).send({ success: true, data: data });
});
// exports.deleteClothesById = asyncHandler(async (req, res, next) => {
//   const id = req.params.id;
//   await Clothes.findByIdAndDelete(id);
//   res, status(200).send({ success: true });
// });
exports.findNewClothes = asyncHandler(async (req, res, next) => {
  const data = await Clothes.find({ isSold: false, isAvailableToSell: true })
    .sort({ created_date: -1 }) // -1 for descending order (most recent first)
    .limit(6);

  res.status(200).send({ success: true, data: data });
});
exports.filterClothes = asyncHandler(async (req, res, next) => {
  let query = {};
  const byString = req.query.by_string;
  const priceFrom = parseFloat(req.query.price_from);
  const priceTo = parseFloat(req.query.price_to);
  const sizes = req.query.sizes;
  const categories = req.query.categories;
  const gender = req.query.gender;
  if (byString) {
    query.name = new RegExp(byString, "i");
  }
  if (priceFrom || priceTo) {
    query.price = {};
    if (priceFrom) query.price.$gte = priceFrom;
    if (priceTo) query.price.$lte = priceTo;
  }
  if (sizes) {
    const sizeArray = sizes.split(",").map((size) => size.trim());
    query.size = { $in: sizeArray };
  }
  console.log(categories);
  if (categories) {
    const categoryArray = categories
      .split(",")
      .map((category) => category.trim());
    query.category_id = { $in: categoryArray };
  }
  if (gender) {
    const genderArray = gender.split(",").map((gend) => gend.trim());
    query.gender = { $in: genderArray };
  }
  const clothes = await Clothes.find({
    ...query,
    isSold: false,
    isAvailableToSell: true,
  });
  const result = await Clothes.aggregate([
    {
      $match: {
        isSold: false,
        isAvailableToSell: true,
      },
    },
    {
      $group: {
        _id: null,
        maxPrice: { $max: "$price" },
        minPrice: { $min: "$price" },
      },
    },
  ]);
  res.status(200).send({
    success: true,
    data: clothes,
    minPrice: result[0] ? result[0].minPrice : 0,
    maxPrice: result[0] ? result[0].maxPrice : 0,
  });
});
exports.deleteClothesByOwnerId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Cart.deleteMany({ _id: id }).populate("User");

  res.status(200).send({ success: true, data: data });
});

//хувцасны id-г ашиглан db-ээс хувцсыг устгах contoller.
exports.deleteClothesById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const clothes = await Clothes.findById(id);
  console.log(clothes);
  const imageUrl = clothes.images;
  const promises = imageUrl?.map((el, i) => cloudinary.uploader.destroy(el));

  await Promise.all(promises);
  //sags ustgah
  await CartItem.deleteMany({ clothes_id: clothes?._id }); //changes
  //sags ustgah
  //zahialga ustgah
  await Order.deleteMany({
    items: {
      $in: clothes?._id,
    },
  });
  //zahialga ustgah
  const data = await clothes.remove();
  res.status(200).send({ success: true, data });
});
//front-ийн home page-дээр харуулах сүүлд нэмэгдсэн хувцаснуудыг авах controller. created_date-ээр нь эрэмбэлэн эхний 6-г авч байна.
exports.getPieChartData = asyncHandler(async (req, res, next) => {
  const data = await Clothes.aggregate([
    {
      $group: {
        _id: "$category_id",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "categories", // This should be the actual name of the Category collection in the database
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $unwind: "$categoryDetails",
    },
    {
      $project: {
        _id: 0,
        name: "$categoryDetails.name",
        count: 1,
      },
    },
  ]);

  res.status(200).send({ success: true, data: data });
});

exports.updateClothingDataById = asyncHandler(async (req, res, next) => {
  let newData = { ...req.body };
  delete newData.id;

  const data = await Clothes.findOneAndUpdate(
    { _id: req.body.id },
    { ...newData }
  );
  console.log(data);
  res.status(200).send({ success: true, data });
});
exports.getHomePageClothesInfo = asyncHandler(async (req, res, next) => {
  const wellWornOrNewClothes = await Clothes.find({
    status: { $in: ["Well worn", "New"] },
    isSold: false,
    isAvailableToSell: true,
  }).limit(6);
  const topRatedClothes = await Clothes.find({
    isSold: false,
    isAvailableToSell: true,
  })
    .sort({ rating: -1 })
    .limit(6);
  const topReviewedClothes = await Clothes.find({
    isSold: false,
    isAvailableToSell: true,
  })
    .sort({ review: -1 })
    .limit(6);
  const data = { wellWornOrNewClothes, topRatedClothes, topReviewedClothes };
  res.status(200).send({ success: true, data });
});
