import mongoose from "mongoose";

const TaxRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  region: { type: String, required: true },
  status: { type: String, required: true },
  annualIncome: { type: Number, required: true },
  deductions: { type: Number, default: 0 },
  taxableIncome: { type: Number, required: true },
  estimatedQuarterlyTaxes: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("TaxRecord", TaxRecordSchema);
