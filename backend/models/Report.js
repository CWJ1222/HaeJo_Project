const ReportModel = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
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
      providerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING, // 이미지 저장 경로
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "submitted", "approved"),
        defaultValue: "pending",
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      tableName: "reports",
    }
  );

  return Report;
};

module.exports = ReportModel;
