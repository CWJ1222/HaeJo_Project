const { Request, User } = require("../models");

exports.createRequest = async (req, res) => {
  try {
    const { title, description, budget, userId } = req.body;

    // userId가 숫자인지 확인
    if (!userId || isNaN(userId)) {
      return res
        .status(400)
        .send({ isSuccess: false, message: "잘못된 사용자 ID입니다." });
    }

    const newRequest = await Request.create({
      title,
      description,
      budget,
      userId,
    });

    res.send({ isSuccess: true, requestId: newRequest.id });
  } catch (err) {
    console.error("요청 생성 오류:", err);
    res.status(500).send("서버 오류!");
  }
};
