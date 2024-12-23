const validators = require("../utils/validators");
const Country = require("../models/Country");
const State = require("../models/State");
const City = require("../models/City");
const Masjid = require("../models/Masjid");
const { successResponse } = require("../utils/responseHandler");
const AppError = require("../utils/appError");
const { deleteFile } = require("../utils/fileHandler");

exports.getCountries = async (req, res, next) => {
  try {
    const findCountries = await Country.find().select("name code");

    if (!findCountries) throw new AppError(`country is not found`, 404);

    successResponse(
      res,
      "list of countries fetch successfull!!",
      200,
      findCountries
    );
  } catch (error) {
    next(error);
  }
};

exports.getStates = async (req, res, next) => {
  try {
    const findStates = await State.find()
      .select("name code")
      .populate("countryId", "name code");

    if (!findStates) throw new AppError(`state is not found`, 404);

    successResponse(res, "list of states fetch successfull!!", 200, findStates);
  } catch (error) {
    next(error);
  }
};

exports.getCities = async (req, res, next) => {
  try {
    const findCities = await City.find()
      .select("name state")
      .populate({
        path: "stateId",
        select: "name countryId",
        populate: {
          path: "countryId",
          select: "name code",
        },
      });

    if (!findCities) throw new AppError(`city is not found`, 404);

    successResponse(res, "list of cities fetch successfull!!", 200, findCities);
  } catch (error) {
    next(error);
  }
};

exports.addMasjid = async (req, res, next) => {
  try {
    validators.addMasjidValidator(req);

    const newMasjid = new Masjid(req.body);

    await newMasjid.save();

    successResponse(res, "Masjid added successfull!!", 201, newMasjid);
  } catch (error) {
    next(error);
  }
};

exports.uploadNamazTimingChart = async (req, res, next) => {
  try {
    // Validate input
    validators.uploadNamazTimingChartValidator(req);

    const masjidId = req?.params?.masjidId;
    const singleUploadedFile = req?.file;

    // Generate the new file URL
    const newFileUrl = `${process.env.BASE_URL}/api/public/uploads/${singleUploadedFile.filename}`;

    // Find the masjid document
    const masjid = await Masjid.findById(masjidId);

    if (!masjid) throw new AppError("Masjid not found", 404);

    // Delete the old file if it exists
    deleteFile(masjid.namazTimingChartUrl);

    // Update the database with the new file URL
    masjid.namazTimingChartUrl = newFileUrl;
    const updatedMasjid = await masjid.save();

    // Respond with success
    successResponse(res, "Namaz chart uploaded successfully!!", 200, updatedMasjid);
  } catch (error) {
    next(error);
  }
};
