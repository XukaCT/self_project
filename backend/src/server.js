import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './libs/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Public routes
app.use('/api/auth', authRoute);
// Private routes

connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})


