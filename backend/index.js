import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/db.js";
import authRoutes from "./routes/auth-route.js";
const app = express();

dotenv.config();

const PORT = 3000;
app.use(express.json());
app.use("/api/v1/auth/", authRoutes);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
