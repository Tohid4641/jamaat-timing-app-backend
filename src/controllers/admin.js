const validators = require("../utils/validators");
const Country = require("../models/Country");
const State = require("../models/State");
const { successResponse } = require("../utils/responseHandler");
const AppError = require("../utils/appError");
const City = require("../models/City");
const Namaaz = require("../models/Namaaz");
const MasjidNamaazTiming = require("../models/MasjidNamaazTiming");

exports.getCountry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findCountry = await Country.findOne({ _id: id }).select("name code");

    if (!findCountry) throw new AppError(`country is not found`, 404);

    successResponse(res, "country fetch successfull!!", 200, findCountry);
  } catch (error) {
    next(error);
  }
};

exports.addCountry = async (req, res, next) => {
  try {
    validators.addCountryValidator(req);

    const findCountry = await Country.findOne({ name: req.body.name });

    if (findCountry)
      throw new AppError(`${req.body.name} country is already present`, 409);

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

    const findCountry = await Country.findOne({ _id: id });
    if (!findCountry) throw new AppError(`country is not found!`, 404);

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

exports.getState = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findState = await State.findOne({ _id: id })
      .select("name country")
      .populate("countryId", "name code");

    if (!findState) throw new AppError(`state is not found`, 404);

    successResponse(res, "state fetch successfull!!", 200, findState);
  } catch (error) {
    next(error);
  }
};

exports.addState = async (req, res, next) => {
  try {
    validators.addStateValidator(req);

    const findState = await State.findOne({ name: req.body.name });

    if (findState)
      throw new AppError(`${req.body.name} state is already present`, 409);

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

    const findState = await State.findOne({ _id: id });
    if (!findState) throw new AppError(`state is not found!`, 404);

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

exports.getCity = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findCity = await City.findOne({ _id: id })
      .select("name state")
      .populate({
        path: "stateId",
        select: "name countryId",
        populate: {
          path: "countryId",
          select: "name code",
        },
      });

    if (!findCity) throw new AppError(`city is not found`, 404);

    successResponse(res, "city fetch successfull!!", 200, findCity);
  } catch (error) {
    next(error);
  }
};

exports.addCity = async (req, res, next) => {
  try {
    validators.addCityValidator(req);

    const findCity = await City.findOne({ name: req.body.name });

    if (findCity)
      throw new AppError(`${req.body.name} city is already present`, 409);

    const newCity = new City(req.body);

    await newCity.save();

    successResponse(res, "city added successfull!!", 201, newCity);
  } catch (error) {
    next(error);
  }
};

exports.updateCity = async (req, res, next) => {
  try {
    validators.addCityValidator(req);

    const { id } = req.params;

    const findCity = await City.findOne({ _id: id });
    if (!findCity) throw new AppError(`city is not found!`, 404);

    await City.findOneAndUpdate({ _id: id }, { ...req.body });

    successResponse(res, "city updated successfull!!", 200);
  } catch (error) {
    next(error);
  }
};

exports.deleteCity = async (req, res, next) => {
  try {
    const { id } = req.params;

    await City.findOneAndDelete({ _id: id });

    successResponse(res, "city deleted successfull!!", 200);
  } catch (error) {
    next(error);
  }
};

exports.addNamaaz = async (req, res, next) => {
  try {
    validators.addNamaazValidator(req);

    const newNamaaz = new Namaaz(req.body);

    await newNamaaz.save();

    successResponse(res, "Namaaz added successfull!!", 201, newNamaaz);
  } catch (error) {
    next(error);
  }
};

exports.addMasjidNamaazTiming = async (req, res, next) => {
  try {
    validators.addMasjidNamaazTimingValidator(req);

    const newTiming = new MasjidNamaazTiming(req.body);

    await newTiming.save();

    successResponse(res, "Timing added successfull!!", 201, newTiming);
  } catch (error) {
    next(error);
  }
};
