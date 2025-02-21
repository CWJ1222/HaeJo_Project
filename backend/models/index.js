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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
