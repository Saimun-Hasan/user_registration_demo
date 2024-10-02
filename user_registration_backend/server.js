// Import necessary modules
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

// Import custom modules
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Load environment variables
dotenv.config();

//Configuation
const port = 5000;

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);






// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});