
const passport = require ('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    consumerKey: 'www.example.com',
    consumerSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3001/auth/google/callback" //REL is the path of the client
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

