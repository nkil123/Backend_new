require ('dotenv').config ();
const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth2').Strategy;
const {uuid} = require ('uuidv4');

const User = require ('../models/user.model');
const {newToken} = require ('../controllers/auth.controller');

passport.use (
  new GoogleStrategy (
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:2233/auth/google/callback',
      userProfileURL: 'https://**www**.googleapis.com/oauth2/v3/userinfo',
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log (accessToken, refreshToken, profile, done);
      let user = await User.findOne ({email: profile._json.email})
        .lean ()
        .exec ();

      if (!user) {
        user = await User.create ({
          email: profile._json.email,
          password: uuid (),
        });
      }
      const token = newToken (user);
      console.log (token);
      return done (null, {user, token});
    }
  )
);

module.exports = passport;
