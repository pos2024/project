import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import rateLimit from 'express-rate-limit';
import logger from './config/logger.js';
import cors from 'cors';  // Import the cors package

dotenv.config();

const app = express();


connectDB();

// Enable CORS for all routes
app.use(cors()); 

 // app.use(cors({ origin: 'http://localhost:3000' })); 


app.use(express.json());

// Rate limiting for the registration route
const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, 
  message: "Too many registrations from this IP, please try again later.",
});


app.use('/api/users/register', registerRateLimiter);


app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
