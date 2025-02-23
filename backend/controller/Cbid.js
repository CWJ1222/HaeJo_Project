const { Bid, User, Request } = require("../models");

// 📌 입찰 등록 또는 수정
exports.placeBid = async (req, res) => {
  try {
    const { requestId, userId, amount } = req.body;
    console.log("📌 입찰 요청 수신:", { requestId, userId, amount }); // ✅ 로그 추가

    // 기존 입찰 확인
    const existingBid = await Bid.findOne({ where: { requestId, userId } });

    if (existingBid) {
      // 기존 입찰이 있으면 수정
      existingBid.amount = amount;
      await existingBid.save();
      return res.send({
        isSuccess: true,
        message: "입찰 금액이 수정되었습니다.",
      });
    } else {
      // 새로운 입찰 생성
      await Bid.create({ requestId, userId, amount });
      return res.send({ isSuccess: true, message: "입찰이 완료되었습니다." });
    }
  } catch (err) {
    console.error("입찰 오류:", err);
    res.status(500).send("서버 오류!");
  }
};

// 📌 특정 요청에 대한 사용자의 입찰 정보 가져오기
exports.getUserBid = async (req, res) => {
  try {
    const { requestId, userId } = req.params;

    const bid = await Bid.findOne({ where: { requestId, userId } });

    if (bid) {
      return res.send({ isSuccess: true, bid });
    } else {
      return res.send({ isSuccess: false, message: "입찰 기록이 없습니다." });
    }
  } catch (err) {
    console.error("입찰 조회 오류:", err);
    res.status(500).send("서버 오류!");
  }
};

// 📌 내가 등록한 요청에 대한 입찰 목록 가져오기
exports.getMyRequestsAndBids = async (req, res) => {
  try {
    const userId = req.session.user?.id;
    if (!userId) {
      return res
        .status(401)
        .send({ isSuccess: false, message: "로그인이 필요합니다." });
    }

    const myRequests = await Request.findAll({
      where: { userId },
      include: [
        {
          model: Bid,
          include: [
            {
              model: User,
              attributes: ["id", "nickname", "email"], // 입찰한 사람 정보
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // 선택된 입찰 정보 추가
    const requestsWithSelectedBid = await Promise.all(
      myRequests.map(async (request) => {
        if (request.selectedBidId) {
          const selectedBid = await Bid.findByPk(request.selectedBidId, {
            include: [{ model: User, attributes: ["nickname"] }],
          });
          return { ...request.toJSON(), selectedBid };
        }
        return request.toJSON();
      })
    );

    res.send({ isSuccess: true, myRequests: requestsWithSelectedBid });
  } catch (err) {
    console.error("내 요청 및 입찰 목록 가져오기 오류:", err);
    res.status(500).send("서버 오류!");
  }
};

exports.selectBid = async (req, res) => {
  try {
    const { requestId, bidId } = req.body;
    const userId = req.session.user?.id;

    if (!userId) {
      return res
        .status(401)
        .send({ isSuccess: false, message: "로그인이 필요합니다." });
    }

    // 요청이 현재 로그인한 사용자의 것인지 확인
    const request = await Request.findOne({ where: { id: requestId, userId } });

    if (!request) {
      return res.status(403).send({
        isSuccess: false,
        message: "이 요청을 선택할 권한이 없습니다.",
      });
    }

    // 요청을 마감하고 선택한 입찰을 저장
    await Request.update(
      { status: "closed", selectedBidId: bidId }, // 요청 상태를 마감(closed) 상태로 변경
      { where: { id: requestId } }
    );

    res.send({
      isSuccess: true,
      message: "입찰이 선택되었습니다. 요청이 마감되었습니다.",
    });
  } catch (err) {
    console.error("입찰 선택 오류:", err);
    res.status(500).send("서버 오류!");
  }
};

// 📌 내가 입찰한 요청 목록 가져오기
exports.getMyBids = async (req, res) => {
  try {
    const userId = req.session.user?.id;
    if (!userId) {
      return res
        .status(401)
        .send({ isSuccess: false, message: "로그인이 필요합니다." });
    }

    // 내가 입찰한 요청 목록 조회
    const myBids = await Bid.findAll({
      where: { userId },
      include: [
        {
          model: Request,
          attributes: ["id", "title", "budget"], // 요청 정보 가져오기
          include: [{ model: User, attributes: ["id", "nickname"] }], // 요청을 등록한 사용자 정보 포함
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.send({ isSuccess: true, myBids });
  } catch (err) {
    console.error("내 입찰 목록 가져오기 오류:", err);
    res.status(500).send("서버 오류!");
  }
};
