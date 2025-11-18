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
app.use(cors());
app.use(express.json());


app.use("/transactions", transactionsRouter);
app.use("/taxRoutes", taxRoutes);
app.use("/auth", authRoutes);
app.use("/budgets", budgetRoutes);
app.use("/api/taxpayment", taxPaymentRoutes); 
app.use("/api/reports", reportRoutes); 
app.use("/api/user", userRoutes);

//connnection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ DB error:", err));

//strrt server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
