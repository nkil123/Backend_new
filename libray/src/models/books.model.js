const mongoose = require ('mongoose');

const bookSchema = new mongoose.Schema (
  {
    book_name: {type: String, required: true},
    body: {type: String, required: false},
    section_id: {
      //mongo_id for doc in the users collections
      type: mongoose.Schema.Types.ObjectId,
      ref: 'section',
      required: true,
    },
    author_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: true,
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model ('book', bookSchema); //posts collectoin
