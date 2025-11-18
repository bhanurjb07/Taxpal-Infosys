import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes.js";
import transactionsRouter from "./routes/TransRoute.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import taxRoutes from "./routes/taxRoutes.js";
import taxPaymentRoutes from "./routes/taxPaymentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";  
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "https://taxpal-infosys.vercel.app",   // Vercel frontend d
    "http://localhost:5173"               
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/transactions", transactionsRouter);
app.use("/taxRoutes", taxRoutes);
app.use("/auth", authRoutes);
app.use("/budgets", budgetRoutes);
app.use("/api/taxpayment", taxPaymentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/user", userRoutes);

// Datbase connectionn
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB error:", err));

// server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
