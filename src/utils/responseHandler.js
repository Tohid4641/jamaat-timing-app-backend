function successResponse(res, message = 'Success', statusCode = 200, data = undefined, additionalFields = {}) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...additionalFields
    });
}

function errorResponse(res, error, errorMessage="Internal Server Error", statusCode = 500) {
    const message = error.message || errorMessage;
    return res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'production' ? null : error, // Hide detailed errors in production
    });
}

module.exports = { successResponse, errorResponse };
