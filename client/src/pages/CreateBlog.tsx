import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import "../assets/styles/CreateBlog.css";

const CreateBlog: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [theme, setTheme] = useState('default');
    const [error, setError] = useState('');
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/blogs',
                { title, content, theme },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            navigate(`/edit-blog/${response.data.slug}`);
        } catch (err) {
            setError('Failed to create blog. Please try again.');
        }
    };

    return (
        <div className="blog-form-container">
            <h2>Create New Blog</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="theme">Theme</label>
                    <select
                        id="theme"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={10}
                    />
                </div>
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default CreateBlog; 