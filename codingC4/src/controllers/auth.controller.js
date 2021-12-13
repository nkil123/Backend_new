const User = require ('../models/user.model');
const jwt = require ('jsonwebtoken');
require ('dotenv').config ();
const newToken = user => {
  return jwt.sign ({user: user}, process.env.ACCESS_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne ({email: req.body.email}).lean ().exec ();
    //chek if the user already exist
    if (user)
      return res
        .status (400)
        .json ({message: 'user already exist', status: 'Failed'});

    //created user
    user = await User.create (req.body);

    //hashing password--predified save in user model
    //creating token

    const token = newToken (user);
    console.log (token);
    return res.status (201).json ({user: user, token: token});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
};
const login = async (req, res) => {
  try {
    let user = await User.findOne ({email: req.body.email}).lean ().exec ();
    if (!user)
      return res.status (201).json ({
        message: 'invalid credential',
        status: 'Failed',
      });

    const compare = await user.comparePassword (req.body.password);
    if (!compare)
      return res.status (201).json ({
        message: 'invalid credential',
        status: 'Failed',
      });

    const token = newToken (user);

    return res.status (201).json ({user: user, token: token});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
};
module.exports = {register, login};
