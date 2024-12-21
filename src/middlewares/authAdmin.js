const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");
const User = require("../models/User");

const authAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) throw new AppError("Invalid token signature!!", 400);

    const decodeUser = await jwt.verify(token, "SECRET");

    if (!decodeUser) throw new AppError("Unauthorized User!", 401);

    const userData = await User.findById(decodeUser._id);

    if (!userData) throw new AppError("User not found!", 404);

    if (userData?.role === "user")
      throw new AppError("Unauthorized Access!", 401);

    req.user = userData;

    next();
  } catch (err) {
    console.error(err.message);
    errorResponse(res, err, "Unauthorized User!!", 401);
  }
};

module.exports = authAdmin;
