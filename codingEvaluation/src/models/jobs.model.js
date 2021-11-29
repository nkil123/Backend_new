const mongoose = require ('mongoose');

const jobSchema = new mongoose.Schema (
  {
    job_name: {type: String, required: true},
    rating: {type: String, required: true},
    notice_p: {type: Number, required: true},
    location: {type: String, required: true},
    skill_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skill',

        required: true,
      },
    ],
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',

      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model ('job', jobSchema);
