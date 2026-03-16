import express from "express";
import dotenv from "dotenv";
import ConnectDB from "../config/dbConfig.js";
dotenv.config();
import authRoutes from "../routes/authRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import jobRoutes from "../routes/jobRoutes.js"
import aiRoutes from "../routes/aiRoutes.js"
import applicationRoutes from "../routes/applicationRoutes.js"
import errorMiddleware from "../middleware/errorHandler.js";






const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
ConnectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ FIX

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/ai", aiRoutes);



app.use(errorMiddleware)
// Start server


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
