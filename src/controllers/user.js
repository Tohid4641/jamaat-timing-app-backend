const validators = require('../utils/validators');
const User = require('../models/User');
const { successResponse } = require('../utils/responseHandler');
const AppError = require('../utils/appError');


exports.renameIt = async (req, res, next) => {
    try {
        validators.signupValidator(req.body);

        successResponse(res, "successfull!!", 201, user);
    } catch (error) {
        next(error)
    }
}