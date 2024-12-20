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
  const { name, code } = req.body;
  const { id } = req.params;

  const allowedFields = ["name", "code"];

  const checkAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (!name || !code || typeof name !== "string" || typeof code !== "string") {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  } else if (!validator.isAlpha(name) || !validator.isAlpha(code)) {
    throw new AppError("Please enter a valid inputs", 400);
  } else if (id) {
    // for update country
    if (!validator.isAlphanumeric(id)) {
      throw new AppError("Please enter a valid inputs", 400);
    }
  }
};

exports.addStateValidator = (req) => {
  const { name, countryId } = req.body;
  const { id } = req.params;

  const allowedFields = ["name", "countryId"];

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
  } else if (!validator.isAlpha(name) || !validator.isAlphanumeric(countryId)) {
    throw new AppError("Please enter a valid inputs", 400);
  } else if (id) {
    // for update
    if (!validator.isAlphanumeric(id)) {
      throw new AppError("Please enter a valid inputs", 400);
    }
  }
};

exports.addCityValidator = (req) => {
  const { name, stateId } = req.body;
  const { id } = req.params;

  const allowedFields = ["name", "stateId"];

  const checkAllowedFields = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (
    !name ||
    !stateId ||
    typeof name !== "string" ||
    typeof stateId !== "string"
  ) {
    throw new AppError("Please enter a valid inputs!", 400);
  } else if (!checkAllowedFields) {
    throw new AppError("Only valid fields are allowed", 400);
  } else if (!validator.isAlpha(name) || !validator.isAlphanumeric(stateId)) {
    throw new AppError("Please enter a valid inputs", 400);
  } else if (id) {
    // for update
    if (!validator.isAlphanumeric(id)) {
      throw new AppError("Please enter a valid inputs", 400);
    }
  }
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
