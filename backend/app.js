const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Session 설정
app.use(
  session({
    secret: "haejo_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1시간 유지
  })
);

app.use("/api-server", indexRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

sequelize
  .sync({ force: false }) // force: true 로 하면 기존 데이터가 삭제되니 주의
  .then(() => {
    console.log("데이터베이스 동기화 완료");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database sync 오류!", err);
  });
