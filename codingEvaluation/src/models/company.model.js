const mongoose = require ('mongoose');

const companySchema = new mongoose.Schema (
  {
    company: {type: String, required: true},
    location: {type: String, required: true},
    type: {type: String, required: true},
    founder: {type: String, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model ('company', companySchema);
