const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

const app = express();

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });

// passport.use(
//   new LinkedInStrategy(
//     {
//       clientID: config.linkedinAuth.clientID,
//       clientSecret: config.linkedinAuth.clientSecret,
//       callbackURL: config.linkedinAuth.callbackURL,
//       scope: ["r_emailaddress", "r_liteprofile"],
//     },
//     function (token, tokenSecret, profile, done) {
//       return done(null, profile);
//     }
//   )
// );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require("./app/controllers/index")(app);

app.listen(process.env.PORT || 3030, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
