const mongoose = require("mongoose");
const validator = require("validator");

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      validate: (v) => {
        if (!validator.isAlpha(v)) {
          throw new Error("State name name should contain only letters'");
        }
      },
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Country",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        if (ret.countryId) {
          ret.country = ret.countryId;
          delete ret.countryId;
        }
        return ret;
      },
    },
    id: false
  }
);

module.exports = mongoose.model("State", stateSchema);
