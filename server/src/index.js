import express from "express";

const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server test");
});

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
