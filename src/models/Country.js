const mongoose = require('mongoose');
const validator = require("validator");

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        validate: (v) => {
            if (!(v.trim().split(' ').every(part => validator.isAlpha(part)))) {
                throw new Error("Country name should contain only letters'")
            }
        }
    },
    code: {
        type: String,
        required: true,
        uppercase: true,
    },
    continent: {
        type: String, // e.g. "Asia", "Europe"
        enum: ['asia', 'europe', 'north-america', 'south-america', 'australia', 'antarctica'],
        lowercase: true,
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Country", countrySchema);