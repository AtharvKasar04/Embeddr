import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../assets/styles/BlogView.css";

interface Blog {
    title: string;
    content: string;
    theme: string;
    author: {
        username: string;
    };
    createdAt: string;
}

const BlogView: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`https://embeddr-backend.onrender.com/api/blogs/${slug}`);
                setBlog(response.data);
            } catch (err) {
                setError('Failed to load blog. Please try again.');
            }
        };

        fetchBlog();
    }, [slug]);

    if (error) return <div className="error">{error}</div>;
    if (!blog) return <div>Loading...</div>;

    return (
        <div className={`blog-view theme-${blog.theme}`}>
            <h1>{blog.title}</h1>
            <div className="blog-meta">
                <span>By {blog.author.username}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
    );
};

export default BlogView;