const mongoose = require('mongoose');
const validator = require("validator");

const namaazSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: (v) => {
            if (!validator.isAlpha(v)) {
                throw new Error("Namaaz name should contain only letters'")
            }
        }
    }

},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Namaaz", namaazSchema);