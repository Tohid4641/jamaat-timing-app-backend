require('dotenv').config({ path: `${process.cwd()}/src/.env` });


const globalErrorHandler = (err, req, res, next) => {

    if (err.name === 'ValidationError') {

        const errors = Object.keys(err.errors).reduce((acc, field) => {
            acc[field] = err.errors[field].message;
            return acc;
        }, {});

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            error: process.env.NODE_ENV === 'production' ? undefined : errors
        });
    }

    if (err.code === 11000) {
        // Handle unique constraint errors, like duplicate email
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            message: `Duplicate value for ${field}.`
        });
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Somthing Went Wrong!',
    })
};

module.exports = globalErrorHandler;