const mongoose = require('mongoose');
const validator = require("validator");

const stateSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        lowercase: true,
        validate: (v) => {
            if (!validator.isAlpha(v)) {
                throw new Error("State name name should contain only letters'")
            }
        }
    },
    country:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Country"
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("State", stateSchema);