import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import transactionsRouter from "./routes/TransRoute.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import taxRoutes from "./routes/taxRoutes.js";
import taxPaymentRoutes from "./routes/taxPaymentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// CORS FIX
app.use(cors({
  origin: [
    "https://taxpal-infosys.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Preflight support
app.options("*", cors());

// JSON parser
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("Backend running OK");
});

// Routes
app.use("/transactions", transactionsRouter);
app.use("/taxRoutes", taxRoutes);
app.use("/auth", authRoutes);
app.use("/budgets", budgetRoutes);
app.use("/api/taxpayment", taxPaymentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/user", userRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB error:", err));

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
