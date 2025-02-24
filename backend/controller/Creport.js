const { Report, Request } = require("../models");
const upload = require("../middlewares/upload");

// 📌 리포트 작성 API
exports.createReport = async (req, res) => {
  try {
    const { requestId, content } = req.body;
    const providerId = req.session.user?.id;

    if (!providerId) {
      return res
        .status(401)
        .send({ isSuccess: false, message: "로그인이 필요합니다." });
    }

    // ✅ 요청 정보 조회 (결제 완료된 요청인지 확인)
    const request = await Request.findOne({
      where: { id: requestId, status: "paid", selectedBidId: providerId },
    });

    if (!request) {
      return res.status(403).send({
        isSuccess: false,
        message: "리포트를 작성할 권한이 없습니다.",
      });
    }

    const newReport = await Report.create({
      requestId,
      providerId,
      customerId: request.userId, // 요청자의 ID 저장
      content,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // 이미지가 있으면 저장
    });

    res.send({ isSuccess: true, reportId: newReport.id });
  } catch (error) {
    console.error("리포트 생성 오류:", error);
    res.status(500).send("서버 오류!");
  }
};

// 📌 특정 요청의 리포트 조회 (요청자만 확인 가능)
exports.getReportByRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.session.user?.id;

    const report = await Report.findOne({ where: { requestId } });

    if (!report || report.customerId !== userId) {
      return res.status(403).send({
        isSuccess: false,
        message: "리포트를 확인할 권한이 없습니다.",
      });
    }

    res.send({ isSuccess: true, report });
  } catch (error) {
    console.error("리포트 조회 오류:", error);
    res.status(500).send("서버 오류!");
  }
};
