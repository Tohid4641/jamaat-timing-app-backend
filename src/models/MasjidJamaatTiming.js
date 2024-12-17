const mongoose = require('mongoose');
const validator = require("validator");

const masjidJamaatTimingSchema = new mongoose.Schema({

},
{
    timestamps: true,
});

module.exports = mongoose.model("MasjidJamaatTiming", masjidJamaatTimingSchema);