const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  picture: String
});

module.exports = User = mongoose.model('users', UserSchema);
