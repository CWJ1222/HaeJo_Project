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
      amount: {
        // ✅ 결제 금액 저장 (선택된 입찰 금액)
        type: DataTypes.INTEGER,
        allowNull: true,
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
        type: DataTypes.ENUM(
          "open",
          "closed",
          "paid",
          "draft",
          "submitted",
          "completed"
        ),
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
      hasReport: {
        // ✅ 새 필드 추가
        type: DataTypes.BOOLEAN,
        defaultValue: false, // 기본값 false (리포트 작성 전)
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
