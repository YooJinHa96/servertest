const jwt = require("jsonwebtoken");

const express = require("express");
const cors = require("cors");
const { users, findUserByUsername } = require("./userStore"); // store.js에서 함수 임포트

const app = express();
app.listen(8888, () => {
  console.log("임시 서버 시작");
});
app.use(express.json()); // JSON 요청 본문을 파싱하는 미들웨어 추가

// 모든 출처에 대한 요청을 허용
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/test", (req, res) => {
  res.send("Server is test");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = findUserByUsername(email);

  if (user && password === user.password) {
    const token = jwt.sign({ id: user.id }, user.secrey_key, {
      expiresIn: "1h",
    });

    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.get("/api/getTest", (req, res) => {
  console.log(req.headers["accesstoken"]);
});
