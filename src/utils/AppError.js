class AppError extends Error {
    constructor(message="Internal Server Error!!", statusCode=500, data=undefined) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}
module.exports = AppError;
