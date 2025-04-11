(function() {
    // Get the embed token from the script tag
    const script = document.currentScript;
    const embedToken = script.getAttribute('data-embed-token');

    if (!embedToken) {
        console.error('Embed token not found. Please provide a valid embed token.');
        return;
    }

    // Create a container for the blogs
    const container = document.createElement('div');
    container.className = 'embeddr-container';
    script.parentNode.insertBefore(container, script);

    // Fetch and display blogs
    async function loadBlogs() {
        try {
            const response = await fetch(`https://embeddr-backend.onrender.com/api/blogs/embeddable?embedToken=${embedToken}`);
            const blogs = await response.json();

            if (blogs.length === 0) {
                container.innerHTML = '<p>No blogs available.</p>';
                return;
            }

            blogs.forEach(blog => {
                const blogElement = document.createElement('div');
                blogElement.className = `embeddr-blog theme-${blog.theme}`;
                
                blogElement.innerHTML = `
                    <h2>${blog.title}</h2>
                    <div class="blog-content">${blog.content}</div>
                    <div class="blog-meta">
                        <span class="date">${new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                `;

                container.appendChild(blogElement);
            });
        } catch (error) {
            console.error('Failed to load blogs:', error);
            container.innerHTML = '<p>Failed to load blogs. Please try again later.</p>';
        }
    }

    // Add styles
    const styles = `
        .embeddr-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .embeddr-blog {
            margin-bottom: 30px;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .theme-default {
            background-color: #ffffff;
            color: #333333;
        }

        .theme-dark {
            background-color: #1a1a1a;
            color: #ffffff;
        }

        .theme-light {
            background-color: #f5f5f5;
            color: #333333;
        }

        .embeddr-blog h2 {
            margin: 0 0 15px 0;
            font-size: 24px;
        }

        .blog-content {
            line-height: 1.6;
            margin-bottom: 15px;
        }

        .blog-meta {
            font-size: 14px;
            color: #666666;
        }

        .theme-dark .blog-meta {
            color: #999999;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Load blogs
    loadBlogs();
})(); 