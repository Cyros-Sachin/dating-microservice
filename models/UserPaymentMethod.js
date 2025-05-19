import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,          // e.g., Visa...2463
  icon: String,          // icon path or label
  type: String           // 'card' | 'netbanking'
});

export default mongoose.model('UserPaymentMethod', cardSchema);
