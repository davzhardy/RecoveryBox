module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// const mongoose = require('./');

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   email: {type: String, required: true},
//   password: {type: String, required: true},
//   firstName: {type: String, required: true},
//   lastName: {type: String, required: true},
//   registrationDate: {type: Date, required: true},
// });

// const UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;