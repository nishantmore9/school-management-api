dotenv.config()

import express from "express";
import { db } from "./src/db.js";
import dotenv from "dotenv"
import schoolRouter from "./src/school.routes.js"

const app = express();
const PORT = process.env.PORT || 8000
app.use(express.json());

app.use("/api/v1/school", schoolRouter)

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");

  app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
  })
});




