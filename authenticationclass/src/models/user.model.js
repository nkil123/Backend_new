const {Schema, model} = require ('mongoose');
const bcrypt = require ('bcrypt');

const userSchema = new Schema (
  {
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//hook(i,e pre) that mongoose provides which saves data before creating or updating the data
//we are hashing the password and storing in the db, because when db gets hacked we wont be
// giving password  so systems remains safe.

userSchema.pre ('save', function (next) {
  console.log (this.password);
  if (!this.isModified ('password')) return next ();
  const hash = bcrypt.hashSync (this.password, 8);

  this.password = hash;
  next ();
});

userSchema.methods.checkPass = function (password) {
  return new Promise ((res, rej) => {
    bcrypt.compare (password, this.password, function (err, same) {
      console.log (password);
      if (err) rej (err);

      return res (same);
    });
  });
};

module.exports = model ('user', userSchema);
