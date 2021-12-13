// name
// email
// password
// profile_photo_url
// roles

const bcrypt = require ('bcryptjs');
const {Schema, model} = require ('mongoose');

const userSchema = Schema (
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profile_photo_url: {type: String, required: true},
    roles: {type: String, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre ('save', function (next) {
  console.log (this.password);
  if (!this.isModified ('password')) return next ();
  bcrypt.hash (this.password, 8, (err, hash) => {
    this.password = hash;
    console.log (this.password);
    return next ();
  });
});

userSchema.methods.comparePassword = function (password) {
  return new Promise ((res, rej) => {
    bcrypt.compare (password, this.password, (err, c) => {
      if (err) return rej (err);

      return res (c);
    });
  });
};

module.exports = model ('user', userSchema);
