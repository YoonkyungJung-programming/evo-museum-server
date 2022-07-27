module.exports = function (sequelize, DataTypes) {
  const visitor = sequelize.define("Visitor", {
    exhibition_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    visitor_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  return visitor;
};
