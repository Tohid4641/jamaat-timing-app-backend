const validators = require("../utils/validators");
const Country = require("../models/Country");
const { successResponse } = require("../utils/responseHandler");
const AppError = require("../utils/appError");

exports.addCountry = async (req, res, next) => {
  try {
    validators.addCountryValidator(req.body);

    const country = new Country(req.body);

    await country.save();

    successResponse(res, "country added successfull!!", 201, country);
  } catch (error) {
    next(error);
  }
};
