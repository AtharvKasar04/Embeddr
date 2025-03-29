import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET as string;

// Register new user
export const register: RequestHandler = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
};

// Login user
export const login: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Error logging in' });
    }
};

// Get user profile
export const getProfile: RequestHandler = async (req, res) => {
    try {
        const user = await User.findById(req.user?._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching profile' });
    }
};

// Get or generate embed token
export const getEmbedToken: RequestHandler = async (req, res) => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Generate token if it doesn't exist
        if (!user.embedToken) {
            user.generateEmbedToken();
            await user.save();
        }

        res.json({ embedToken: user.embedToken });
    } catch (error) {
        res.status(400).json({ error: 'Error getting embed token' });
    }
}; 