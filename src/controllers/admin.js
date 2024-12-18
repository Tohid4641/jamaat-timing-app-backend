const validators = require("../utils/validators");
const Country = require("../models/Country");
const State = require("../models/State");
const { successResponse } = require("../utils/responseHandler");
const AppError = require("../utils/appError");

exports.addCountry = async (req, res, next) => {
  try {
    validators.addCountryValidator(req);

    const findCountry = await Country.findOne({ name:req.body.name });

    if(findCountry) throw new AppError(`${req.body.name} country is already present`, 409);

    const newCountry = new Country(req.body);

    await newCountry.save();

    successResponse(res, "country added successfull!!", 201, newCountry);
  } catch (error) {
    next(error);
  }
};

exports.updateCountry = async (req, res, next) => {
  try {
    validators.addCountryValidator(req);

    const { id } = req.params;

    await Country.findOneAndUpdate({ _id: id }, { ...req.body });

    successResponse(res, "country updated successfull!!", 200);
  } catch (error) {
    next(error);
  }
};

exports.deleteCountry = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Country.findOneAndDelete({ _id: id });

    successResponse(res, "country deleted successfull!!", 200);
  } catch (error) {
    next(error);
  }
};

exports.addState = async (req, res, next) => {
  try {
    validators.addStateValidator(req);

    const findState = await State.findOne({ name:req.body.name });

    if(findState) throw new AppError(`${req.body.name} state is already present`, 409);

    const newState = new State(req.body);

    await newState.save();

    successResponse(res, "state added successfull!!", 201, newState);
  } catch (error) {
    next(error);
  }
};

exports.updateState = async (req, res, next) => {
  try {
    validators.addStateValidator(req);

    const { id } = req.params;

    await State.findOneAndUpdate({ _id: id }, { ...req.body });

    successResponse(res, "state updated successfull!!", 200);
  } catch (error) {
    next(error);
  }
};

exports.deleteState = async (req, res, next) => {
  try {
    const { id } = req.params;

    await State.findOneAndDelete({ _id: id });

    successResponse(res, "state deleted successfull!!", 200);
  } catch (error) {
    next(error);
  }
};
