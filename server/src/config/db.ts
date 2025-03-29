import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from the server root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

// Connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}; 