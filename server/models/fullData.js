module.exports = (sequelize, DataTypes) => sequelize.define('Data', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {         
      model: 'Users',
      key: 'id'
    }
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});