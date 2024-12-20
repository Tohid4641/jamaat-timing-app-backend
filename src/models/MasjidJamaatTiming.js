const mongoose = require('mongoose');
const validator = require("validator");

const masjidJamaatTimingSchema = new mongoose.Schema({
    azaanTime: {
        type: String,
        required: true
    },
    jamaatTime: {
        type: String,
        required: true
    },
    masjidId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Masjid'
    },
    namaazId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Namaaz'
    }

},
    {
        timestamps: true,
    });

module.exports = mongoose.model("MasjidJamaatTiming", masjidJamaatTimingSchema);