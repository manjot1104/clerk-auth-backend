import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import { requireAuth } from '@clerk/express'; //  correct middleware

const app = express();
app.use(cors({
  origin: "https://clerk-auth-sandy.vercel.app", 
  credentials: true
}));

app.use(express.json());

//  Root route (for testing)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

//  Protected route (only logged-in users can access)
app.get("/api/protected", requireAuth(), (req, res) => {
  const { userId } = req.auth;
  res.json({ message: `This is protected data for user ID: ${userId}` });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

//  Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
