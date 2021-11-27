const mongoose = require ('mongoose');

const secSchema = new mongoose.Schema (
  {
    section_name: {type: String, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model ('section', secSchema); //users
