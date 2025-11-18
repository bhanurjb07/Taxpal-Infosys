import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["Income", "Expense"], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }, 
  description: { type: String },
});

export default mongoose.model("Transaction", transactionSchema);
