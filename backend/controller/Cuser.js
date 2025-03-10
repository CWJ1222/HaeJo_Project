const { User } = require("../models");
const bcrypt = require("bcrypt");

// 회원가입
exports.register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    // 이메일 중복 체크
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .send({ isSuccess: false, message: "중복된 이메일입니다." });
    }

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
    res.clearCookie("connect.sid"); // 세션 쿠키 삭제
    res.send({ isSuccess: true, message: "로그아웃 성공!" });
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

exports.updateProfile = async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const userId = req.session.user?.id;

    if (!userId) {
      return res
        .status(401)
        .send({ isSuccess: false, message: "로그인이 필요합니다." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .send({ isSuccess: false, message: "사용자를 찾을 수 없습니다." });
    }

    user.nickname = nickname;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    req.session.user.nickname = nickname; // 세션 업데이트

    res.send({
      isSuccess: true,
      user: { id: user.id, email: user.email, nickname: user.nickname }, // ✅ id 추가
    });
  } catch (err) {
    console.error("프로필 업데이트 오류:", err);
    res.status(500).send("서버 오류!");
  }
};
