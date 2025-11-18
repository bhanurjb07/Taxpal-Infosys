import express from "express";
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

router.get("/monthly", authMiddleware, async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { date: { $type: "date" }, user_id: new ObjectId(req.user.id) } },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          totalIncome: { $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] } },
          totalExpense: { $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] } },
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const formatted = data.map(item => ({
      month: `${new Date(item._id.year, item._id.month - 1).toLocaleString("default", { month: "short" })} ${item._id.year}`,
      income: item.totalIncome,
      expense: item.totalExpense,
      net: item.totalIncome - item.totalExpense
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/quarterly", authMiddleware, async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { date: { $type: "date" }, user_id: new ObjectId(req.user.id) } },
      {
        $group: {
          _id: {
            quarter: { $ceil: { $divide: [{ $month: "$date" }, 3] } },
            year: { $year: "$date" }
          },
          totalIncome: { $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] } },
          totalExpense: { $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] } }
        }
      },
      { $sort: { "_id.year": 1, "_id.quarter": 1 } }
    ]);

    const formatted = data.map(item => ({
      quarter: `Q${item._id.quarter} ${item._id.year}`,
      income: item.totalIncome,
      expense: item.totalExpense,
      net: item.totalIncome - item.totalExpense
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
