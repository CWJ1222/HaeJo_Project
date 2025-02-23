const express = require("express");
const router = express.Router();
const { Request } = require("../models");

// Toss Payments 설정
const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
const encryptedSecretKey =
  "Basic " + Buffer.from(secretKey + ":").toString("base64");

// 결제 승인 API
router.post("/confirm", async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;

  try {
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, amount, paymentKey }),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      return res.status(400).json(result);
    }

    const requestId = parseInt(orderId.split("_")[1]);

    // ✅ 요청 상태를 결제완료(`paid`)로 변경
    await Request.update({ status: "paid" }, { where: { id: requestId } });

    res.json({ success: true, result });
  } catch (error) {
    console.error("결제 승인 오류:", error);
    res.status(500).send("서버 오류!");
  }
});

exports.confirmPayment = async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;

  try {
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, amount, paymentKey }),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      return res.status(400).json(result);
    }

    const requestId = parseInt(orderId.split("_")[1]);

    await Request.update({ status: "paid" }, { where: { id: requestId } });

    await Transaction.create({
      requestId,
      amount,
      status: "completed",
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error("결제 승인 오류:", error);
    res.status(500).send("서버 오류!");
  }
};

module.exports = router;
