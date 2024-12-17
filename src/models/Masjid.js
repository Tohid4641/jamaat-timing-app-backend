const mongoose = require('mongoose');
const validator = require("validator");

const masjidSchema = new mongoose.Schema({

},
{
    timestamps: true,
});

module.exports = mongoose.model("Masjid", masjidSchema);