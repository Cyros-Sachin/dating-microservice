import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/DatingProfile.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/datingApp';

const genders = ['Male', 'Female', 'Other'];
const interests = ['Men', 'Women', 'Anyone'];
const lookings = ['Serious Relationship', 'Casual Dating', 'Any'];
const locations = ['New York', 'Jersey City', 'Newark', 'Stamford'];
const professions = ['Software Engineer', 'Doctor', 'Teacher', 'Graphic Designer', 'Student'];
const languages = ['English', 'Spanish', 'French', 'Mandarin'];
const likes = ['Hiking', 'Reading', 'Music', 'Traveling', 'Art'];

function getRandomFromArray(arr, count = 1) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function seedUsers() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Connected to MongoDB');

  const users = [];

  for (let i = 1; i <= 15; i++) {
    const gender = getRandomFromArray(genders)[0];
    const interestedIn = getRandomFromArray(interests)[0];
    const lookingFor = getRandomFromArray(lookings, 2);
    const drinkFreq = getRandomFromArray(['Never', 'Occasionally', 'Socially', 'Regularly'])[0];
    const smokeFreq = getRandomFromArray(['Never', 'Occasionally', 'Regularly', 'Trying to quit'])[0];
    const workoutOptions = getRandomFromArray(['Not very active', 'Sometimes', 'Regularly', 'Almost every day'], 2);
    const userLocations = getRandomFromArray(locations, 2); // set 2 to match multi-location filters
    const userProfessions = getRandomFromArray(professions, 1);
    const userLanguages = getRandomFromArray(languages, 2);
    const userLikes = getRandomFromArray(likes, 3 + Math.floor(Math.random() * 3)); // 3–5 likes

    const user = new User({
      user_id: `user${i}`,
      firstName: `User${i}`,
      gender, // string
      interestedIn, // string
      lookingFor, // array
      age: Math.floor(Math.random() * (45 - 20 + 1)) + 20,
      height: `${Math.floor(Math.random() * (200 - 150 + 1)) + 150}`,
      drinkFreq,
      smokeFreq,
      workoutOptions, // array
      locations: userLocations, // array
      professions: userProfessions, // string
      languages: userLanguages, // array
      describeSelf: 'Just a cool person looking to meet someone interesting.',
      idealDate: 'Long walks and deep conversations over dinner.',
      greatPartner: 'Caring, fun-loving, and adventurous.',
      likes: userLikes, // array
    });

    users.push(user);
  }

  await User.insertMany(users);
  console.log('✅ Seeded users successfully');
  mongoose.disconnect();
}

seedUsers().catch(err => {
  console.error('❌ Seeding failed:', err);
  mongoose.disconnect();
});
