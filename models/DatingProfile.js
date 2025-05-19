import mongoose from 'mongoose';

const datingProfileSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // References User.user_id
  firstName: String,
  gender: [String],
  interestedIn: [String],
  lookingFor: [String],
  age: Number,
  height: String,
  drinkFreq: [String],
  smokeFreq: [String],
  workoutOptions: [String],
  locations: [String],
  professions: [String],
  languages: [String],
  describeSelf: String,
  idealDate: String,
  greatPartner: String,
  likes: [String]
}, { timestamps: true });

export default mongoose.model('DatingProfile', datingProfileSchema);