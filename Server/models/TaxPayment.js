import mongoose from "mongoose";

const taxPaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    estimatedQuarterlyTaxes: { type: Number, required: true },
    Q1: { type: Boolean, default: false }, 
    Q2: { type: Boolean, default: false },
    Q3: { type: Boolean, default: false }, 
    Q4: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

export default mongoose.model("TaxPayment", taxPaymentSchema);
