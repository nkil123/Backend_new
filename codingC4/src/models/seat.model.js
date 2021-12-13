const {Schema, model} = require ('mongoose');

const seatSchema = Schema (
  {
    show: {
      type: Schema.Types.ObjectId,
      ref: 'show',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model ('seat', seatSchema);
