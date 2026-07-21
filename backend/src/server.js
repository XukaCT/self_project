import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './libs/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRouter.js';
import { protectedRoute } from './middlewares/authMiddleware.js';
import friendRoute from './routes/friendRoute.js';
import cors from 'cors';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))

// Public routes
app.use('/api/auth', authRoute);

// Private routes
app.use(protectedRoute);
app.use('/api/users', userRoute);
app.use('/api/friends', friendRoute);


connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})


