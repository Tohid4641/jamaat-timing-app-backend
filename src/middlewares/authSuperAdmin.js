const AppError = require("../utils/appError");
const { errorResponse } = require("../utils/responseHandler");

const authSuperAdmin = async (req, res, next) => {
  const userData = req?.user;
  try {
    if (!userData) throw new AppError("User not found!", 404);

    if (userData?.role !== "superAdmin")
      throw new AppError("Unauthorized Access!", 401);

    next();
  } catch (err) {
    console.error(err.message);
    errorResponse(res, err, "Unauthorized Access!!", 401);
  }
};

module.exports = authSuperAdmin;
