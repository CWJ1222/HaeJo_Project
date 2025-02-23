const TransactionModel = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
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
      },
      bidId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "bids",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      providerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled", "failed"),
        defaultValue: "pending",
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      tableName: "transactions",
    }
  );

  return Transaction;
};

module.exports = TransactionModel;
