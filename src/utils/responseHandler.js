function successResponse(res, message = 'Success', statusCode = 200, data = undefined, additionalFields = {}) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...additionalFields
    });
}

function errorResponse(res, error, statusCode = 500) {
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'production' ? null : error, // Hide detailed errors in production
    });
}

module.exports = { successResponse, errorResponse };
