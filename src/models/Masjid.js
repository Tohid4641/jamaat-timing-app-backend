const mongoose = require('mongoose');

const masjidSchema = new mongoose.Schema({

},
{
    timestamps: true,
});

module.exports = mongoose.model("Masjid", masjidSchema);