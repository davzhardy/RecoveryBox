module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    meetings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    feeling: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moods: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suggestions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Data.associate = db => {
    db.Data.belongsTo(db.User, {
      onDelete: 'CASCADE',
      foreignKey: {allowNull: false}
    })
  };

  return Data;
}