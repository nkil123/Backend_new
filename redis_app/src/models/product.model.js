const {Schema, model} = require ('mongoose');

const productSchema = new Schema (
  {
    bike: {type: String, required: true},
    laptop: {type: String, required: false},
    car: {type: String, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model ('product', productSchema);
