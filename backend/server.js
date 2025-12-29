import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors";

dotenv.config();

const app=express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.listen(process.env.PORT || 5000, async () => {
  console.log("Server is running");
});