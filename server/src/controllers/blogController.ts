import { Request, Response, RequestHandler } from 'express';
import { Blog } from '../models/Blog';
import { User } from '../models/User';

// Create new blog
export const createBlog: RequestHandler = async (req, res) => {
    try {
        const { title, content, theme } = req.body;
        
        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
            
        const blog = new Blog({
            title,
            content,
            theme,
            slug, 
            author: req.user?._id
        });
        
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: 'Error creating blog' });
    }
};

// Get all blogs by user
export const getUserBlogs: RequestHandler = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user?._id });
        res.json(blogs);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching blogs' });
    }
};

// Get single blog by slug
export const getBlogBySlug: RequestHandler = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'username');
        if (!blog) {
            res.status(404).json({ error: 'Blog not found' });
            return;
        }
        res.json(blog);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching blog' });
    }
};

// Update blog
export const updateBlog: RequestHandler = async (req, res) => {
    try {
        const { title, content, theme, isPublished } = req.body;
        const blog = await Blog.findOne({ 
            slug: req.params.slug,
            author: req.user?._id 
        });

        if (!blog) {
            res.status(404).json({ error: 'Blog not found' });
            return;
        }

        blog.title = title;
        blog.content = content;
        blog.theme = theme;
        blog.isPublished = isPublished;
        await blog.save();

        res.json(blog);
    } catch (error) {
        res.status(400).json({ error: 'Error updating blog' });
    }
};

// Delete blog
export const deleteBlog: RequestHandler = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ 
            slug: req.params.slug,
            author: req.user?._id 
        });

        if (!blog) {
            res.status(404).json({ error: 'Blog not found' });
            return;
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting blog' });
    }
};

// Add a new controller function
export const updateBlogEmbedStatus: RequestHandler = async (req, res) => {
    try {
        const { blogIds, isSelected } = req.body;
        
        // Validate input
        if (!Array.isArray(blogIds)) {
            res.status(400).json({ error: 'blogIds must be an array' });
            return;
        }

        // Update blogs' embed status
        await Blog.updateMany(
            { 
                _id: { $in: blogIds },
                author: req.user?._id  // Security: ensure user only updates their blogs
            },
            { isSelectedForEmbed: isSelected }
        );
        
        res.json({ message: 'Blog embed status updated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error updating blog embed status' });
    }
};

// Modify the getEmbeddableBlogs controller
export const getEmbeddableBlogs: RequestHandler = async (req, res) => {
    try {
        const { theme, token } = req.query;
        
        // Find user by embed token
        const user = await User.findOne({ embedToken: token });
        if (!user) {
            res.status(404).json({ error: 'Invalid embed token' });
            return;
        }

        const query: any = { 
            isPublished: true,
            isSelectedForEmbed: true,
            author: user._id
        };
        
        if (theme) {
            query.theme = theme;
        }

        const blogs = await Blog.find(query)
            .populate('author', 'username')
            .select('title slug theme createdAt content');
            
        res.json(blogs);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching embeddable blogs' });
    }
}; 