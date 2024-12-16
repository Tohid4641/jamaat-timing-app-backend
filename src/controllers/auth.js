const validators = require('../utils/validators');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { successResponse } = require('../utils/responseHandler');
const AppError = require('../utils/appError');


const signup = async (req, res, next) => {
    try {
        validators.signupValidator(req.body);

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            ...req.body,
            password: hashPassword
        });

        await user.save();

        successResponse(res, "signup successfull!!", 201, user);
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        validators.loginValidator(req.body);

        const { emailId, password } = req.body;

        const user = await User.findOne({emailId});

        if(!user) throw new AppError("Invalid credentials", 400);

        const isPasswordValid = await user.validatePassword(password);

        if(!isPasswordValid) throw new AppError("Invalid credentials", 400);
        
        const token = await user.getJWT();

        res.cookie('token', token);

        successResponse(res,  "login successfull!!");
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        
        res.cookie('token', null, {expires : new Date(Date.now())});

        successResponse(res, "logout successfull!!");
    } catch (error) {
        next(error)
    }
};

const updatePassword = async (req, res, next) => {
    const { newPassword, oldPassword, emailId } = req.body;
    try {
        validators.updatePasswordValidator(req.body);

        const user = await User.findOne({emailId});

        if(!user) throw new AppError('User not found', 404);

        const validatedPassword = await bcrypt.compare(oldPassword, user.password);

        if(!validatedPassword) throw new AppError('Invalid old password!', 400);

        const hashPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne({_id:user._id}, {$set: {password: hashPassword}})

        successResponse(res, "Your password is updated!!");
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signup,
    login,
    logout,
    updatePassword
}