const mongoose = require('mongoose');

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
        unique:true
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Country", countrySchema);