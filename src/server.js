const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const { users, findUserByUsername } = require("./userStore"); // store.js에서 함수 임포트
const { v4: uuidv4 } = require("uuid");
const REFRESH_SECRET = uuidv4();
const ACCESS_SECRET = uuidv4();
const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // 클라이언트 도메인
  credentials: true, // 쿠키를 허용합니다
};

app.listen(8888, () => {
  console.log("임시 서버 시작");
});
app.use(express.json()); // JSON 요청 본문을 파싱하는 미들웨어 추가
app.use(cookieParser());
// 모든 출처에 대한 요청을 허용
app.use(cors(corsOptions));
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
    const token = jwt.sign({ id: user.id }, ACCESS_SECRET, {
      expiresIn: "1h",
    });
    // 리프레시 토큰 생성
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // 쿠키에 리프레시 토큰 저장
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // XSS 공격 방지
      secure: false, // HTTPS를 통해서만 쿠키가 전송
      maxAge: 7 * 24 * 60 * 60 * 1000, // 쿠키 유효 기간 (예: 7일)
    });

    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});
app.get("/api/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).send("Access Denied");
  }

  try {
    const userData = jwt.verify(refreshToken, REFRESH_SECRET);

    const accessToken = jwt.sign({ id: userData.id }, ACCESS_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
});
app.get("/api/getTest", (req, res) => {
  console.log(req.headers["accesstoken"]);
});
