const mongoose = require('mongoose');
const validator = require("validator");

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
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "State",
    }
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                if (ret.stateId) {
                    ret.state = ret.stateId;
                    delete ret.stateId;
                }
                return ret;
            },
        },
        id: false
    });

module.exports = mongoose.model("City", citySchema);