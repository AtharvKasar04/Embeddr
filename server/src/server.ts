import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import path from "path";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    // origin: ['http://localhost:3000', 'http://localhost:5000'],
    // credentials: true
}));
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Server running")
})
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
  

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
    console.log("Static files served from:", path.join(__dirname, "public"));

});