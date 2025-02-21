const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: "users",
    }
  );

  return User;
};

module.exports = UserModel;
