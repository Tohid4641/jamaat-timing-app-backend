const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        validate: (v) => {
            if (!validator.isAlpha(v)) {
                throw new Error("City name should contain only letters'")
            }
        }
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "State"
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("City", citySchema);