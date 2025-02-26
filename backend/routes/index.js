const express = require("express");
const router = express.Router();
const userController = require("../controller/Cuser");
const mainController = require("../controller/Cmain");
const requestController = require("../controller/Crequest");
const bidController = require("../controller/Cbid");
const paymentController = require("../controller/Cpayment");
const reportController = require("../controller/Creport");
const upload = require("../middlewares/upload");
const { getMyRequests } = require("../controller/Crequest");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/session", userController.checkSession);

router.get("/", mainController.getIndex);
router.get("/user", mainController.getUser);
router.put("/update-profile", userController.updateProfile);

router.post("/request", requestController.createRequest);
router.get("/requests", requestController.getRequests);
router.get("/latest-requests", requestController.getLatestRequests);

router.post("/bid", bidController.placeBid); // 입찰 등록/수정
router.get("/bid/:requestId/:userId", bidController.getUserBid); // 사용자의 입찰 조회

router.get("/my-requests", bidController.getMyRequestsAndBids);
router.post("/select-bid", bidController.selectBid);
router.get("/my-bids", bidController.getMyBids); // ✅ 내가 입찰한 요청 목록 가져오기

router.post("/confirm", paymentController);

router.post("/report", upload.single("image"), reportController.createReport);
router.get("/report/:requestId", reportController.getReportByRequest);
router.get("/my-requests", getMyRequests); // ✅ 이 라우트가 등록되어 있는지 확인

module.exports = router;
