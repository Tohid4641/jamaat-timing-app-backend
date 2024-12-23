const multer = require("multer");
const fs = require("fs");
const { filesUploadValidator } = require("../utils/validators");

// Custom storage engine
const customStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/uploads";
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the upload path exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const customFileFilter = (req, file, cb) => {
  filesUploadValidator(file, (err, isValid) => {
    if (err) {
      // Pass the error to Multer
      cb(err, false);
    } else if (!isValid) {
      // Explicitly reject the file
      cb(null, false);
    } else {
      // Accept the file
      cb(null, true);
    }
  });
};

const upload = multer({
  storage: customStorage,
  fileFilter: customFileFilter,
});

module.exports = upload;
