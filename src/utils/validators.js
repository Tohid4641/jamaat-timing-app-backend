const validator = require("validator");
const AppError = require("./appError");

exports.signupValidator = (data) => {
  const { name, email, password, confirmPassword } = data;

  const allowedFields = ["name", "email", "password", "confirmPassword"];

  const checkAllowedFields = Object.keys(data).every((key) =>
    allowedFields.includes(key)
  );

  if (!name || !email || !password || !confirmPassword) {
    throw new AppError("Provide all valid fields", 400);
  } else if (!validator.isEmail(email)) {
    throw new AppError("Email is not valid", 400);
  } else if (!validator.isStrongPassword(password)) {
    throw new AppError("Please enter a strong password", 400);
  } else if (password !== confirmPassword) {
    throw new AppError("Password is not mactching", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  }
};

exports.loginValidator = (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new AppError("Invalid Credentials", 400);
  } else if (!validator.isEmail(email)) {
    throw new AppError("Invalid Credentials", 400);
  }
};

exports.updatePasswordValidator = (data) => {
  const { newPassword, oldPassword, email } = data;

  if (!newPassword || !oldPassword || !email) {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!validator.isEmail(email)) {
    throw new AppError("Invalid email Id", 400);
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new AppError("Please choose a strong password!", 400);
  }
};

exports.addCountryValidator = (req) => {
  const { name, code, continent } = req.body;
  const { id } = req.params;

  const allowedFields = ["name", "code", "continent"];

  const checkAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (!name || !code || typeof name !== "string" || typeof code !== "string") {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  } else if (!(name.trim().split(' ').every(part => validator.isAlpha(part))) || !validator.isAlpha(code)) {
    throw new AppError("Please enter a valid inputs", 400);
  } else if (id) {
    // for update country
    if (!validator.isAlphanumeric(id)) {
      throw new AppError("Please enter a valid inputs", 400);
    }
  } else if (continent) {
    if (typeof continent !== 'string') throw new AppError("Please enter a valid inputs!", 400);
    const allowedContinents = ['asia', 'europe', 'north-america', 'south-america', 'australia', 'antarctica', 'Asia', 'Europe', 'North-America', 'South-America', 'Australia', 'Antarctica'];

    if (!allowedContinents.includes(continent)) {
      throw new AppError("Only valid continents are allowed", 400);
    }
  }
};

exports.addStateValidator = (req) => {
  const { name, countryId, type } = req.body;
  const { id } = req.params;

  const allowedFields = ["name", "countryId", "type"];

  const checkAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (
    !name ||
    !countryId ||
    typeof name !== "string" ||
    typeof countryId !== "string"
  ) {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  } else if (!(name.trim().split(' ').every(part => validator.isAlpha(part))) || !validator.isAlphanumeric(countryId)) {
    throw new AppError("Please enter a valid inputs", 400);
  } else if (id) {
    // for update
    if (!validator.isAlphanumeric(id)) {
      throw new AppError("Please enter a valid inputs", 400);
    }
  }

  // type is optional --- default added in schema = state
  if (type) {
    const allowedTypeFields = ['state', 'province', 'emirate', 'county'];

    if (!allowedTypeFields.includes(type)) {
      throw new AppError("Only valid 'type' are allowed", 400);
    }

  }
};

exports.addCityValidator = (req) => {
  const { name, stateId, countryId } = req.body;
  const { id } = req.params;

  console.log(req.body)
  const allowedFields = ["name", "stateId", "countryId", "isCapital"];

  const checkAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key));

  if (name && typeof name !== "string") {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  } else if (name && !name.trim().split(' ').every(part => validator.isAlpha(part))) {
    throw new AppError("Please enter a valid inputs", 400);
  } else if (id && !validator.isAlphanumeric(id)) {
    // for update
    throw new AppError("Please enter a valid inputs", 400);
  } else if (stateId &&
    (typeof stateId !== "string" || !validator.isAlphanumeric(stateId)))
    throw new AppError("Please enter a valid inputs!", 400)
  else if
    (countryId && (typeof countryId !== "string" || !validator.isAlphanumeric(countryId)))
    throw new AppError("Please enter a valid inputs!", 400);

};

exports.addMasjidValidator = (req) => {
  const { name, cityId } = req.body;
  const { id } = req.params;

  const allowedFields = ["name", "desc", "cityId"];

  const checkAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (
    !name ||
    !cityId ||
    typeof name !== "string" ||
    typeof cityId !== "string"
  ) {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  } else if (!validator.isAlpha(name) || !validator.isAlphanumeric(cityId)) {
    throw new AppError("Please enter a valid inputs", 400);
  } else if (id) {
    // for update
    if (!validator.isAlphanumeric(id)) {
      throw new AppError("Please enter a valid inputs", 400);
    }
  }
};

exports.addNamaazValidator = (req) => {
  const { name } = req.body;
  const { id } = req.params;

  const allowedFields = ["name"];

  const checkAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (!name || typeof name !== "string") {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  } else if (!validator.isAlpha(name)) {
    throw new AppError("Please enter a valid inputs", 400);
  } else if (id) {
    // for update
    if (!validator.isAlphanumeric(id)) {
      throw new AppError("Please enter a valid inputs", 400);
    }
  }
};

exports.addMasjidNamaazTimingValidator = (req) => {
  const { azaanTime, jamaatTime, masjidId, namaazId } = req.body;
  const { id } = req.params;

  const allowedFields = ["azaanTime", "jamaatTime", "masjidId", "namaazId"];

  const checkAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (
    !azaanTime ||
    typeof azaanTime !== "string" ||
    !jamaatTime ||
    typeof jamaatTime !== "string" ||
    !masjidId ||
    typeof masjidId !== "string" ||
    !namaazId ||
    typeof namaazId !== "string"
  ) {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  } else if (id) {
    // for update
    if (!validator.isAlphanumeric(id)) {
      throw new AppError("Please enter a valid inputs", 400);
    }
  }
};

exports.uploadNamazTimingChartValidator = (req) => {
  if (!req.params.masjidId || !validator.isAlphanumeric(req.params.masjidId))
    throw new AppError("Invalid Masjid ID", 400);
};

exports.filesUploadValidator = (file, cb) => {
  const allowedExtensions = ["png", "jpeg", "jpg"];
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  const maxFileSizeMB = 2;

  const fileExtension = file.originalname.split(".").pop().toLowerCase();
  const fileSizeMB = file.size / (1024 * 1024);

  // Validate extension and MIME type
  if (
    !allowedExtensions.includes(fileExtension) ||
    !allowedMimeTypes.includes(file.mimetype)
  ) {
    return cb(new AppError("Invalid file type", 400), false); // Reject file
  }

  // Validate size
  if (fileSizeMB > maxFileSizeMB) {
    return cb(new AppError("File size exceeds the limit", 400), false); // Reject file
  }

  cb(null, true); // Accept file
};
