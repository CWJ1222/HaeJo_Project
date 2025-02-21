const BidModel = (sequelize, DataTypes) => {
  const Bid = sequelize.define(
    "Bid",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "requests",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      tableName: "bids",
    }
  );

  return Bid;
};

module.exports = BidModel;
