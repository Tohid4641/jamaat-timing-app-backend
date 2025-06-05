const mongoose = require('mongoose');
const validator = require("validator");

const masjidNamaazTimingSchema = new mongoose.Schema({
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

masjidNamaazTimingSchema.index({ masjidId: 1, namaazId: 1 }, { unique: true });

module.exports = mongoose.model("MasjidNamaazTiming", masjidNamaazTimingSchema);