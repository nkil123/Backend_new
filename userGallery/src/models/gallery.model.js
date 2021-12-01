const {Schema, model} = require ('mongoose');

const gallerySchema = new Schema (
  {
    images_url: [{type: String, required: true}],
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model ('gallery', gallerySchema);
