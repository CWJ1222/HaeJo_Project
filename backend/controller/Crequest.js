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
exports.getRequests = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const offset = (page - 1) * limit;

    const { count, rows } = await Request.findAndCountAll({
      where: { status: "open" }, // ✅ 마감되지 않은 요청만 조회
      include: [
        {
          model: User,
          attributes: ["id", "nickname"], // 요청한 사용자의 닉네임 포함
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    res.send({ isSuccess: true, totalRequests: count, requests: rows });
  } catch (err) {
    console.error("요청 목록 불러오기 오류:", err);
    res.status(500).send("서버 오류!");
  }
};
exports.getLatestRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: { status: "open" }, // ✅ 마감되지 않은 요청만 가져오기
      include: [
        {
          model: User,
          attributes: ["nickname"], // 요청한 사용자의 닉네임 가져오기
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.send({ isSuccess: true, requests });
  } catch (err) {
    console.error("최신 요청 불러오기 오류:", err);
    res.status(500).send("서버 오류!");
  }
};
