const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const fileType = /jpeg|jpg|png|webp/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only Image are allowed(jpeg,jpg,png,webp)"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
