const mongoose = require('mongoose');
const validator = require("validator");

const masjidSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: (v) => {
            if (!validator.isAlpha(v)) {
                throw new Error("Masjid name should contain only letters'");
            }
        },
    },
    desc: {
        type: String,
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "City",
    },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Masjid", masjidSchema);