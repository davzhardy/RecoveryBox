const mongoose = require('./');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  registrationDate: {type: Date, required: true},
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;