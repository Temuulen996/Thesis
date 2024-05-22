const express = require("express");
const app = express();
const cron = require("node-cron");
var path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
var cors = require("cors");
app.use(cors());
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
// const errorHandler = require("./middleware/errorHandler");
var bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const jwt = require("jsonwebtoken");
//PARSER
app.use(fileupload({ useTempFiles: true }));
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
//Parse

//db connect
connectDb();
//db connect

const asyncHandler = require("./middleware/asyncHandler");
const User = require("./models/user");
const updatePendingOrders = require("./services/orders");
//Routes
const ClothesRoute = require("./routes/clothes.routes");
const UserRoute = require("./routes/user.routes");
const SessionRoute = require("./routes/session.routes");
const DonationRoute = require("./routes/donation.routes");
const LogRoute = require("./routes/log.routes");
const CategoryRoute = require("./routes/category.routes");
const CartItemRoute = require("./routes/cart_item.routes");
const FeedBackRoute = require("./routes/feedback.routes");
const ShoppingCartRoute = require("./routes/shopping_cart.routes");
const PaymentRoute = require("./routes/payment.routes");
const OrderRoute = require("./routes/order.routes");
const NotificationRoute = require("./routes/notification.routes");
//Routes

//
app.get(
  "/check",
  asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
      throw new myError(
        "ene uildliig hiihed tanii erh hurehgui baina ta login hiine uu..",
        401
      );
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new myError("token baihgui baina..", 401);
    }
    const tokenObj = jwt.verify(token, "ECOMMERCE_CLOTHES");

    const user = await User.findById(tokenObj.id);
    if (!user) {
      throw new myError(
        "ene uildliig hiihed tanii erh hurehgui baina ta login hiine uu..",
        401
      );
    }
    res.status(200).send({ success: true, isLogged: true, user });
  })
);
//
//middleware
app.use("/api/clothes", ClothesRoute);
app.use("/api/notification", NotificationRoute);
app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/cart_item", CartItemRoute);
app.use("/api/log", LogRoute);
app.use("/api/feedback", FeedBackRoute);
app.use("/api/payment", PaymentRoute);
app.use("/api/order", OrderRoute);
// app.use("/api/session", SessionRoute);
// app.use("/api/shopping_cart", ShoppingCartRoute);
// app.use("/api/donation", DonationRoute);
//middleware

app.get("/", async (req, res, next) => {
  res.status(200).send({ response: "server-тэй амжилттай холбогдлоо." });
});
//errorHandler
app.use(errorHandler);
//errorHandler

//schedule
cron.schedule("0 0 * * *", () => {
  console.log("Шөнө дундын ажил явагдаж байна.");
  updatePendingOrders();
});
//schedule
const server = app.listen(process.env.PORT, () => {
  console.log(`server ${process.env.PORT} port дээр аслаа`);
});
const io = require("socket.io")(server, { cors: { origin: "*" } });
app.set("io", io);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinNotificationRoom", (userId) => {
    console.log("🚀 ~ socket.on ~ userId:", userId);
    socket.join(userId);
    console.log(`User ${userId} joined notification room`);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
process.on("unhandledRejection", (err, promise) => {
  console.log(`алдаа гарлаа : ${err.message}`.red.underline.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
