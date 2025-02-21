const RequestModel = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("open", "closed"),
        defaultValue: "open",
      },
      selectedBidId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "bids",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      tableName: "requests",
    }
  );

  return Request;
};

module.exports = RequestModel;
