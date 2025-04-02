import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import "../assets/styles/MyBlogs.css";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    theme: string;
    isPublished: boolean;
    createdAt: string;
}

const MyBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/blogs/user/blogs',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setBlogs(response.data);
            } catch (err) {
                setError('Failed to fetch blogs. Please try again.');
            }
        };

        fetchBlogs();
    }, [token]);

    return (
        <div className="my-blogs">
            <div className="header">
                <h2>My Blogs</h2>
                <Link to="/create-blog" className="create-button">
                    Create New Blog
                </Link>
            </div>
            
            {error && <div className="error">{error}</div>}
            
            {blogs.length === 0 ? (
                <p>You haven't created any blogs yet.</p>
            ) : (
                <div className="blogs-grid">
                    {blogs.map(blog => (
                        <div key={blog._id} className="blog-card">
                            <h3>{blog.title}</h3>
                            <div className="blog-meta">
                                <span className={`status ${blog.isPublished ? 'published:' : 'draft'}`}>
                                    {blog.isPublished ? 'Published on: ' : 'Draft'}
                                </span>
                                <span className="date">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="blog-actions">
                                <Link to={`/edit-blog/${blog.slug}`} className="edit-button">
                                    Edit
                                </Link>
                                <Link to={`/blog/${blog.slug}`} className="view-button">
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBlogs; 