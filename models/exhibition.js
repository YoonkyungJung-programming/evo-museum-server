module.exports = function (sequelize, DataTypes) {
  const exhibition = sequelize.define("Exhibition", {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    exp: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    exp2: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    imageUrl2: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    unrealUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  });

  return exhibition;
};
