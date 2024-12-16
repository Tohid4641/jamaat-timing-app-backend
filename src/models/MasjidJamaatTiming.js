const mongoose = require('mongoose');

const masjidJamaatTimingSchema = new mongoose.Schema({

},
{
    timestamps: true,
});

module.exports = mongoose.model("MasjidJamaatTiming", masjidJamaatTimingSchema);