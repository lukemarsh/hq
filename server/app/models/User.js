const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  email: String,
  photo: String
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
