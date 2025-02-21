const { User } = require("../models");
const bcrypt = require("bcrypt");

// 회원가입
exports.register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hash, nickname });
    res.send({ isSuccess: true, userId: newUser.id });
  } catch (err) {
    console.log("회원가입 오류", err);
    res.status(500).send("서버 오류!");
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res
        .status(400)
        .send({ isSuccess: false, message: "이메일이 존재하지 않습니다." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .send({ isSuccess: false, message: "비밀번호가 틀렸습니다." });

    req.session.user = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
    res.send({ isSuccess: true, user: req.session.user });
  } catch (err) {
    console.log("로그인 오류", err);
    res.status(500).send("서버 오류!");
  }
};

// 로그아웃
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("로그아웃 실패!");
    res.clearCookie("connect.sid");
    res.send({ isSuccess: true });
  });
};

// 세션 확인
exports.checkSession = (req, res) => {
  if (req.session.user) {
    res.send({ isAuthenticated: true, user: req.session.user });
  } else {
    res.send({ isAuthenticated: false });
  }
};
