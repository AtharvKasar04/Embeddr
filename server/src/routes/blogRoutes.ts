import express from 'express';
import { auth } from '../middleware/auth';
import {
    createBlog,
    getUserBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    getEmbeddableBlogs,
    updateBlogEmbedStatus
} from '../controllers/blogController';

const router = express.Router();

// Public routes
router.get('/embed', getEmbeddableBlogs);
router.get('/:slug', getBlogBySlug);

// Protected routes
router.post('/', auth, createBlog);
router.get('/user/blogs', auth, getUserBlogs);
router.put('/:slug', auth, updateBlog);
router.delete('/:slug', auth, deleteBlog);
router.patch('/embed-status', auth, updateBlogEmbedStatus);

export default router; 