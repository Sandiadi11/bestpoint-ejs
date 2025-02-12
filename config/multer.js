const multer = require("multer");
const path = require("path");
const ExpressError = require("../utils/ErrorHandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); //dikrektori penyimpanan gambar
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // format nama file
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    //fungsi untuk memeriksa format file
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new ExpressError("Only images are allowed!", 405));
    }
  },
});

module.exports = upload;
