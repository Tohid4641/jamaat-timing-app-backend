const mongoose = require('mongoose');
const validator = require("validator");

const countrySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        lowercase: true,
        validate: (v) => {
            if (!validator.isAlpha(v)) {
                throw new Error("Country name should contain only letters'")
            }
        }
    },
    code:{
        type:String,
        required:true,
        uppercase:true,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Country", countrySchema);