const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine destination folder based on the fieldname
    console.log("file");
    let dest = "uploads/";
    if (file.fieldname === "userImage") {
      dest += "user/";
    } else if (file.fieldname === "clothesImage") {
      dest += "clothes/";
    }

    cb(null, dest);
  },
}); // Use memory storage
const upload = multer({ storage: storage });

module.exports = { upload };
