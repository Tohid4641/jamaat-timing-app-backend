const validator = require('validator');
const AppError = require('./appError');

const signupValidator = (data) => {
    const { name, email, password, confirmPassword } = data;
    if(!name || !email || !password ||!confirmPassword){
        throw new AppError("Provide all valid fields", 400);
    }else if(!validator.isEmail(email)){
        throw new AppError("Email is not valid", 400);
    }else if(!validator.isStrongPassword(password)){
        throw new AppError('Please enter a strong password', 400);
    }else if(password !== confirmPassword){
        throw new AppError('Password is not mactching', 400);
    }
}

const loginValidator = (data) => {
    const { emailId, password } = data;
    if(!emailId || !password){
        throw new AppError("Invalid Credentials", 400);
    }else if(!validator.isEmail(emailId)){
        throw new AppError("Invalid Credentials", 400);
    }
}

const updatePasswordValidator = (data) => {
    const { newPassword, oldPassword, emailId } = data;

    if(!newPassword || !oldPassword || !emailId){
        throw new AppError("Please enter a valid inputs!", 400);
    }else if(!validator.isEmail(emailId)){
        throw new AppError("Invalid email Id", 400);
    }else if(!validator.isStrongPassword(newPassword)){
        throw new AppError("Please choose a strong password!", 400);
    }
}

module.exports = {
    signupValidator,
    loginValidator,
    updatePasswordValidator
}