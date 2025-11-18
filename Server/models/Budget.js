import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //  foreign key reference to Transaction collection
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    budgetAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    month: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
