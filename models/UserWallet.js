import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: Date,
});

const walletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

export default mongoose.model('UserWallet', walletSchema);
