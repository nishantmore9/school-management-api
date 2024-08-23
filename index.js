import express from "express";
import { db } from "./src/db.js";
import dotenv from "dotenv"
import schoolRouter from "./src/school.routes.js"

dotenv.config()

const app = express();
app.use(express.json());

app.use("/api/v1/school", schoolRouter)

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server started at PORT:${process.env.PORT || 8000}`);
  })
});




