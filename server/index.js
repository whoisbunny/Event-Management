import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import morgan from "morgan";
// import clientRouter from "./routes/client.routes.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();
// import path from "path";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://jay-jinendra-health-care.vercel.app",
      "https://admin-jay-jinendra-health-care.vercel.app",
    ],
    credentials: true, // Allow credentials for cross-origin requests
  })
);

app.use(morgan("dev"));
app.use(express.json());

// app.use("/api/clients", clientRouter);
app.use("/api/auth", authRouter);
// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const start = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} and http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

start();
