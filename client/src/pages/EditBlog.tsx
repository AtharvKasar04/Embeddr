import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import "../assets/styles/EditBlog.css";

interface Blog {
    title: string;
    content: string;
    theme: string;
    isPublished: boolean;
}

const EditBlog: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog>({
        title: '',
        content: '',
        theme: 'default',
        isPublished: false
    });
    const [error, setError] = useState('');
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/blogs/${slug}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setBlog(response.data);
            } catch (err) {
                setError('Failed to fetch blog. Please try again.');
            }
        };

        fetchBlog();
    }, [slug, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/blogs/${slug}`,
                blog,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            navigate('/my-blogs');
        } catch (err) {
            setError('Failed to update blog. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(
                    `http://localhost:5000/api/blogs/${slug}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                navigate('/my-blogs');
            } catch (err) {
                setError('Failed to delete blog. Please try again.');
            }
        }
    };

    return (
        <div className="edit-blog-container">
            <h2>Edit Blog</h2>
            {error && <div className="edit-error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="edit-form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={blog.title}
                        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="theme">Theme</label>
                    <select
                        id="theme"
                        value={blog.theme}
                        onChange={(e) => setBlog({ ...blog, theme: e.target.value })}
                    >
                        <option value="default">Default</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={blog.content}
                        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                        required
                        rows={10}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={blog.isPublished}
                            onChange={(e) => setBlog({ ...blog, isPublished: e.target.checked })}
                        />
                        Publish
                    </label>
                </div>
                <div className="edit-button-group">
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleDelete} className="delete">
                        Delete Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog; 