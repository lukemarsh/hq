const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config');
const User = require('./models/User');
const routes = require('./routes');

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
// const ensureApiAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   res.status(401);
//   res.send();
// };

const server = (app) => {
  mongoose.connect(config.db.mongodb);

  app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: config.secrets.session.secret,
    saveUninitialized: false, // don't create session until something stored
    resave: false // don't save session if unmodified
  }));

  passport.use(new GoogleStrategy({
    clientID: config.secrets.google.clientID,
    clientSecret: config.secrets.google.clientSecret,
    callbackURL: config.secrets.google.callbackURL
  }, (accessToken, refreshToken, profile, done) => {
    const userProfile = { displayName: profile.displayName };

    if (profile.emails && profile.emails.length > 0) {
      userProfile.email = profile.emails[0].value;

      // TODO: require a string helper lib
      if (userProfile.email.indexOf('@theappbusiness.com', userProfile.email.length - '@theappbusiness.com'.length) < 1) {
        return done(null, false, { message: 'Only TAB users are permitted for now' });
      }
    } else {
      return done(null, false, { message: 'Failed to determine users email address' });
    }

    if (profile.photos && profile.photos.length > 0) {
      userProfile.photo = profile.photos[0].value;
    }

    return User.findOrCreate({ googleId: profile.id }, userProfile, (err, user) => done(err, user));
  }));

  passport.serializeUser((user, done) =>
    done(null, user.googleId) // this is the 'user' property saved in req.session.passport.user
  );

  passport.deserializeUser((id, done) =>
    User.findOne({ googleId: id }, (error, user) =>
      done(error, user)
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.use('/api/categories', routes.categories);
  app.use('/api/components', routes.components);
  app.use('/api/current_user', routes.user);

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

module.exports = (app) => {
  server(app);
  return app;
};
