import express from "express";
import Transaction from "../models/Transaction.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const router = express.Router();

//  Get all transactions for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;

    const dateOnly = new Date(date).toISOString().slice(0, 10);
    if (new Date(dateOnly) > new Date()) {
      return res.status(400).json({ error: "Date cannot be in the future" });
    }
    const transaction = new Transaction({
      user_id: req.user.id,
      type,
      category,
      amount,
      date: new Date(date),
      description
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: "Failed to add transaction" });
  }
});


// Delete transaction
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id
    });
    if (!transaction) return res.status(404).json({ error: "Transaction not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});
//  Update transaction
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;

    // Optional: validate date (cannot be in future)
    if (date && new Date(date) > new Date()) {
      return res.status(400).json({ error: "Date cannot be in the future" });
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      {
        $set: {
          type,
          category,
          amount,
          date: new Date(date),
          description,
        },
      },
      { new: true } 
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update transaction" });
  }
});


export default router;
