const multer = require("multer");
const path = require("path");

// 이미지 저장 경로 및 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // `uploads` 폴더에 저장
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 7)}${ext}`;
    cb(null, fileName);
  },
});

// 파일 필터링 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 업로드 가능합니다."), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
