# Embeddr - Blog Embedding Platform

Embeddr is a platform that allows you to create and embed blogs anywhere on the web. With Embeddr, you can write your content once and display it across multiple websites using a simple embed code.

## Features

- Create and manage multiple blogs
- Customize blog appearance with different themes
- Secure authentication system
- Easy-to-use embed code generation
- Responsive design for all devices
- Real-time blog status updates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/embeddr.git
cd embeddr
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the server:
```bash
cd ../server
npm start
```

6. Start the client (in a new terminal):
```bash
cd ../client
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Usage

1. Create an account or sign in
2. Create a new blog using the blog editor
3. Go to the Blog Embed page
4. Select which blogs you want to make embeddable
5. Copy the generated embed code
6. Paste the code into any website where you want to display your blogs

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Blogs
- GET /api/blogs - Get all blogs
- POST /api/blogs - Create a new blog
- GET /api/blogs/:slug - Get a specific blog
- PUT /api/blogs/:slug - Update a blog
- DELETE /api/blogs/:slug - Delete a blog
- GET /api/blogs/user/blogs - Get user's blogs
- PATCH /api/blogs/embed-status - Update blog embed status
- GET /api/blogs/embeddable - Get embeddable blogs

### Users
- GET /api/users/embed-token - Get user's embed token

## Security

- JWT-based authentication
- Secure password hashing
- Protected API routes
- CORS enabled for specific origins
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
