import express, { Request, Response } from "express";
import cors from "cors";
import { NotionAPI } from "notion-client";

const notion = new NotionAPI();
const app = express();
// 모든 출처에 대한 요청을 허용
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.listen(8888, () => {
  console.log(`타입스크립트 서버 시작`);
});

app.get("/api/notion", async (req: Request, res: Response) => {
  const pageId = req.query.pageId as string;

  const recordMap = await notion.getPage(pageId);

  res.send(recordMap);
});
