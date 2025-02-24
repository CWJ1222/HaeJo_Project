const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./User")(sequelize, Sequelize);
db.Request = require("./Request")(sequelize, Sequelize);
db.Bid = require("./Bid")(sequelize, Sequelize); // ✅ Bid 모델 추가
db.Transaction = require("./Transaction")(sequelize, Sequelize);
db.Report = require("./Report")(sequelize, Sequelize); // ✅ Report 모델 추가

// 관계 설정
db.User.hasMany(db.Request, {
  foreignKey: "userId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
db.Request.belongsTo(db.User, {
  foreignKey: "userId",
  targetKey: "id",
  onDelete: "CASCADE",
});

db.User.hasMany(db.Bid, {
  foreignKey: "userId",
  sourceKey: "id",
  onDelete: "CASCADE",
}); // ✅ 추가
db.Request.hasMany(db.Bid, {
  foreignKey: "requestId",
  sourceKey: "id",
  onDelete: "CASCADE",
}); // ✅ 추가
db.Bid.belongsTo(db.User, {
  foreignKey: "userId",
  targetKey: "id",
  onDelete: "CASCADE",
});
db.Bid.belongsTo(db.Request, {
  foreignKey: "requestId",
  targetKey: "id",
  onDelete: "CASCADE",
});

// ✅ 요청(Request)과 결제(Transaction)의 관계 (1:1)
db.Request.hasOne(db.Transaction, {
  foreignKey: "requestId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
db.Transaction.belongsTo(db.Request, {
  foreignKey: "requestId",
  targetKey: "id",
  onDelete: "CASCADE",
});

// ✅ 입찰(Bid)과 결제(Transaction)의 관계 (1:1)
db.Bid.hasOne(db.Transaction, {
  foreignKey: "bidId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
db.Transaction.belongsTo(db.Bid, {
  foreignKey: "bidId",
  targetKey: "id",
  onDelete: "CASCADE",
});

// ✅ 사용자(User)와 결제(Transaction)의 관계 (요청자/제공자)
db.User.hasMany(db.Transaction, {
  foreignKey: "userId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
db.Transaction.belongsTo(db.User, {
  foreignKey: "userId",
  targetKey: "id",
  onDelete: "CASCADE",
});

db.User.hasMany(db.Transaction, {
  foreignKey: "providerId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
db.Transaction.belongsTo(db.User, {
  foreignKey: "providerId",
  targetKey: "id",
  onDelete: "CASCADE",
});

// ✅ 요청(Request)과 리포트(Report)의 관계 (1:1)
db.Request.hasOne(db.Report, {
  foreignKey: "requestId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
db.Report.belongsTo(db.Request, {
  foreignKey: "requestId",
  targetKey: "id",
  onDelete: "CASCADE",
});

// ✅ 결제한 사용자(Customer)와 리포트(Report)의 관계 (1:N)
db.User.hasMany(db.Report, {
  foreignKey: "customerId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
db.Report.belongsTo(db.User, {
  foreignKey: "customerId",
  targetKey: "id",
  onDelete: "CASCADE",
});

// ✅ 입찰이 선택된 제공자(Provider)와 리포트(Report)의 관계 (1:N)
db.User.hasMany(db.Report, {
  foreignKey: "providerId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
db.Report.belongsTo(db.User, {
  foreignKey: "providerId",
  targetKey: "id",
  onDelete: "CASCADE",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
