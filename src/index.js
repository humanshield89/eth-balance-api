import express from "express";
import dotenv from "dotenv";
import { balanceRouter } from "./routes/balance.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", balanceRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port 3000");
});
