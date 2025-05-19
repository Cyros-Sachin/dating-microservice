import express from 'express';
import UserPaymentMethod from '../models/UserPaymentMethod.js';

const router = express.Router();

// Get all methods for a user
router.get('/payment-methods/:userId', async (req, res) => {
  const methods = await UserPaymentMethod.find({ userId: req.params.userId });
  res.json(methods);
});

// Add a new method
router.post('/payment-methods', async (req, res) => {
  const { userId, name, icon, type } = req.body;
  const newMethod = new UserPaymentMethod({ userId, name, icon, type });
  await newMethod.save();
  res.status(201).json(newMethod);
});

// (Optional) Delete a method
router.delete('/payment-methods/:id', async (req, res) => {
  await UserPaymentMethod.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
