const secrets = {};

secrets.google = {
  clientID: '936659445187-bprlfms3bu6cojqnodc8g64dvk31kpqq.apps.googleusercontent.com',
  clientSecret: 'kgJdPIn3NV5EIePxPebLdebk',
  callbackURL: 'http://localhost:8080/auth/google/callback'
};

secrets.session = {
  secret: 'keyboard cat'
};

module.exports = secrets;
