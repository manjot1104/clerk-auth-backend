import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { requireAuth } from '@clerk/express';

const app = express();

app.use(cors({
  origin: "https://clerk-auth-sandy.vercel.app", 
  credentials: true,
}));
app.use(express.json());

//  Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

//  Protected route
app.get('/api/protected', requireAuth(), (req, res) => {
  const { userId } = req.auth();
  res.json({ message: `This is protected data for user ID: ${userId}` });
});

//  MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

//  Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
