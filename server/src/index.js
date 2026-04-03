import express from "express";
import bookRouter from "./routers/bookRouter.js";
import reviewRouter from "./routers/reviewRouter.js";

const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json());
app.use("/api/v1", bookRouter);
app.use("/api/v1", reviewRouter);
  
app.get("/", (_req, res) => {
  res.send("Server test");
});

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
