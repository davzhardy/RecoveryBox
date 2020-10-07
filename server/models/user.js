//REL: updated the database by removing unwanted fields
//REL: this is due to the fact that we no longer user username/password login but oAuth
//REL: this implied changing the login and DB lookup logic
//REL: DB searches will no longer be done on the username but on the Google ID of the user
//REL: note this is heavily optimised for a Google login (would need to be amended for additional oAuth methods)
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: {
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
  })

  User.associate = db => {
    db.User.hasMany(db.Data);
  };

  return User;
};


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