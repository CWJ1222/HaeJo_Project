exports.getIndex = (req, res) => {
  res.send("서버가 정상적으로 실행 중입니다.");
};

exports.getUser = (req, res) => {
  res.send({ message: "사용자 정보를 불러왔습니다." });
};
