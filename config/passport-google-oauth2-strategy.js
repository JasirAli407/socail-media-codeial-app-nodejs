const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "844935577713-amq858b8pt3sjtsv6358ab6gjhsub0sq.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    //    acces token: google thernadh,  refreshToken: acces token expire aayal v use this token to get a renewed access token. profile contain users info
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          return console.log("Error in google strategy-passport", err);
        }

        // console.log(profile);

        if (user) {
          // null means no error. if user found set this user as req.user
          // console.log(user)
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              //  20 ivde length, hex is hexadecimal
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                return console.log(
                  "Error in creating user google strategy-passport", err
                );
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
