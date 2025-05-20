import express from 'express';
import UserWallet from '../models/UserWallet.js'; // Adjust path if needed

const router = express.Router();

// Add money to wallet
router.post('/wallet/topup', async (req, res) => {
  try {
    const userId = req.headers['x-user-id']; // get userId from header
    const { amount, method } = req.body;

    if (!userId || !amount || !method) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const userWallet = await UserWallet.findOneAndUpdate(
      { userId },
      {
        $inc: { balance: amount },
        $push: {
          transactions: {
            title: `Wallet Top-Up (${method})`,
            amount,
            date: new Date()
          }
        }
      },
      { new: true, upsert: true }
    );

    res.json(userWallet);
  } catch (err) {
    console.error('Top-up failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get wallet info
// GET /api/wallet/:userId
router.get('/wallet/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let wallet = await UserWallet.findOne({ userId });

    if (!wallet) {
      // Create a new wallet for this user
      wallet = await UserWallet.create({
        userId,
        balance: 0,
        transactions: [],
      });
    }

    res.json(wallet);
  } catch (err) {
    console.error('Fetch or create wallet error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/wallet/deduct', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const { amount, purpose } = req.body;
    console.log("Recieved");

    if (!userId || !amount) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const wallet = await UserWallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds." });
    }

    const updatedWallet = await UserWallet.findOneAndUpdate(
      { userId },
      {
        $inc: { balance: -amount },
        $push: {
          transactions: {
            title: purpose || "Service Deduction",
            amount: -amount,
            date: new Date()
          }
        }
      },
      { new: true }
    );

    res.json({ success: true, wallet: updatedWallet });
  } catch (err) {
    console.error("Deduction failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
