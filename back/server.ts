import express from "express";
import serveIndex from "serve-index";
import cors from "cors";
import { Article } from "../front/src/app/interfaces/article";

const app = express();
const port = 3000;
let articles: Article[] = [
  { id: "0", name: "Pommier et arbre à chat", price: 8.99, quantity: 14 },
  { id: "1", name: "Poirier", price: 7.99, quantity: 8 },
  { id: "2", name: "Cerisier", price: 5.99, quantity: 17 },
  { id: "3", name: "Oranger", price: 4.99, quantity: 4 },
  { id: "4", name: "Bananier", price: 21, quantity: 31 },
];

const generatedId = () => Date.now() + "_" + Math.floor(Math.random() * 1e6);
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log("in middleware");
  next();
});

const front = "../front/dist/front";

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/articles", (req, res) => {
  res.json(articles);
});

app.post("/api/article", (req, res) => {
  const article: Article = req.body;
  article.id = generatedId();
  console.log(article);
  articles.push(article);
  res.status(201).json(article);
});

app.delete("/api/articles", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter((elem) => !ids.includes(elem.id));
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static(front));

app.use(
  serveIndex(front, {
    icons: true,
  })
);
