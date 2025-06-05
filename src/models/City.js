const mongoose = require('mongoose');
const validator = require("validator");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    validate: (v) => {
      if (!validator.isAlpha(v)) {
        throw new Error("City name should contain only letters");
      }
    }
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: false
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: function () {
      return !this.stateId;
    }
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      if (ret.stateId) {
        ret.state = ret.stateId;
        delete ret.stateId;
      }
      if (ret.countryId) {
        ret.country = ret.countryId;
        delete ret.countryId;
      }
      return ret;
    }
  },
  id: false
});

module.exports = mongoose.model("City", citySchema);
