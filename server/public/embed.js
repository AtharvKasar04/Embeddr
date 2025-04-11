(function() {
    const script = document.currentScript;
    const embedToken = script.getAttribute('data-embed-token');

    // console.log("Embeddr script loaded with token:", embedToken);

    if (!embedToken) {
        console.error('Embed token not found');
        return;
    }

    const container = document.createElement('div');
    container.className = 'embeddr-container';
    document.body.appendChild(container);
    
    // Show loading indicator
    container.innerHTML = '<p>Loading blogs...</p>';

    // Add styles for container and blogs
    const styles = document.createElement('style');
    styles.textContent = `
        .embeddr-container {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 20px auto;
            padding: 10px;
        }
        .embeddr-blog {
            margin-bottom: 20px;
            padding: 15px 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            font-family: 'Inter'
        }
        .theme-default { background-color: #fff; color: #333; }
        .theme-dark { background-color: #1a1a1a; color: #fff; }
        .theme-light { background-color: #f5f5f5; color: #333; }
        .blog-meta {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 14px;
        }
        .view-link {
            background-color: #4a90e2;
            color: white !important;
            padding: 5px 10px;
            border-radius: 4px;
            text-decoration: none;
            cursor: pointer;
        }
        .view-link:hover {
            background-color: #357abd;
        }
        .blog-title {
            margin-top: 0;
            margin-bottom: 10px;
        }
        .blog-content {
            margin-bottom: 15px;
            line-height: 1.4;
        }
        .embeddr-blog a {
            color: inherit;
            text-decoration: none;
        }
        .embeddr-blog a:hover {
            text-decoration: underline;
        }
    `;

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    document.head.appendChild(styles);

    async function loadBlogs() {
        try {
            const response = await fetch(`https://embeddr-backend.onrender.com/api/blogs/embed?token=${embedToken}`);
            const blogs = await response.json();

            // console.log(blogs)

            if (!Array.isArray(blogs)) {
                console.error("Response is not an array:", blogs);
                container.innerHTML = '<p>Error: Unexpected response format</p>';
                return;
            }

            if (blogs.length === 0) {
                container.innerHTML = '<p>No blogs available for embedding. Make sure you have published blogs and selected them for embedding.</p>';
                return;
            }

            // Clear loading indicator
            container.innerHTML = '';

            blogs.forEach(blog => {
                // console.log(blog.content);

                const blogElement = document.createElement('div');
                blogElement.className = `embeddr-blog theme-${blog.theme || 'default'}`;
                
                // Create blog HTML
                blogElement.innerHTML = `
                    <h2 class="blog-title">
                        <a href="http://localhost:5173/blog/${blog.slug}" target="_blank">${blog.title}</a>
                    </h2>
                    <div class="blog-content">
                        ${blog.content ? blog.content.substring(0, 200) + (blog.content.length > 200 ? '...' : '') : ''}
                    </div>
                    <div class="blog-meta">
                        <span class="date">${new Date(blog.createdAt).toLocaleDateString()}</span>
                        <a href="http://localhost:5173/blog/${blog.slug}" class="view-link" target="_blank">
                            Read More
                        </a>
                    </div>
                `;
                
                container.appendChild(blogElement);
            });
        } catch (error) {
            console.error('Failed to load blogs:', error);
            container.innerHTML = `<p>Failed to load blogs: ${error.message}</p>`;
        }
    }

    loadBlogs();
})(); 