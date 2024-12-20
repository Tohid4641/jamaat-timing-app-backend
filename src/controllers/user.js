const validators = require("../utils/validators");
const Masjid = require("../models/Masjid");
const { successResponse } = require("../utils/responseHandler");
const AppError = require("../utils/appError");
const MasjidNamaazTiming = require("../models/MasjidNamaazTiming");

exports.getMasjids = async (req, res, next) => {
  try {
    const masjidList = await Masjid.find()
      .select("name desc cityId")
      .populate({
        path: "cityId",
        select: "name stateId",
        populate: {
          path: "stateId",
          select: "name countryId",
          populate: {
            path: "countryId",
            select: "name code",
          },
        },
      });

    successResponse(res, "Masjids List fetch successfull!!", 200, masjidList);
  } catch (error) {
    next(error);
  }
};

exports.getMasjidNamaazTiming = async (req, res, next) => {
  try {
    const masjidTiming = await MasjidNamaazTiming.find()
    successResponse(res, "Masjids timing fetch successfull!!", 200, masjidTiming);
  } catch (error) {
    next(error);
  }
};
