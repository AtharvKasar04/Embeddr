import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import "../assets/styles/EmbedBlogs.css";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    isSelected: boolean;
    isSelectedForEmbed?: boolean;
}

const BlogEmbed: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [embedToken, setEmbedToken] = useState('');
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
                setBlogs(response.data.map((blog: any) => ({
                    ...blog,
                    isSelected: blog.isSelectedForEmbed || false
                })));
            } catch (err) {
                setError('Failed to fetch blogs. Please try again.');
            }
        };

        const getEmbedToken = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/users/embed-token',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setEmbedToken(response.data.embedToken);
            } catch (err) {
                setError('Failed to fetch embed token. Please try again.');
            }
        };

        fetchBlogs();
        getEmbedToken();
    }, [token]);

    const handleBlogSelection = async (blogId: string, isSelected: boolean) => {
        try {
            await axios.patch(
                'http://localhost:5000/api/blogs/embed-status',
                {
                    blogIds: [blogId],
                    isSelected
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setBlogs(blogs.map(blog => 
                blog._id === blogId ? { ...blog, isSelected } : blog
            ));
        } catch (err) {
            setError('Failed to update blog selection. Please try again.');
        }
    };

    const embedCode = `<script>
    (function() {
        var script = document.createElement('script');
        script.src = 'http://localhost:5000/embed.js';
        script.setAttribute('data-embed-token', '${embedToken}');
        document.head.appendChild(script);
    })();
</script>`;

    return (
        <div className="blog-embed">
            <h2>Blog Embed Settings</h2>
            
            {error && <div className="error">{error}</div>}
            
            <div className="embed-section">
                <h3>Your Embed Code</h3>
                <div className="embed-code">
                    <pre className='embed-code'>{embedCode}</pre>
                    <button 
                        onClick={() => navigator.clipboard.writeText(embedCode)}
                        className="copy-button"
                    >
                        Copy Code
                    </button>
                </div>
                <p className="instructions">
                    Copy this code and paste it into your website where you want the blogs to appear.
                </p>
            </div>

            <div className="blogs-section">
                <h3>Select Blogs to Embed</h3>
                <div className="blogs-list">
                    {blogs.map(blog => (
                        <div key={blog._id} className="blog-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={blog.isSelected}
                                    onChange={(e) => handleBlogSelection(blog._id, e.target.checked)}
                                />
                                {blog.title}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogEmbed; 