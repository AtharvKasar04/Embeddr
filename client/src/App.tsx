import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBlogs';
import BlogEmbed from './pages/BlogEmbed';
import PrivateRoute from './components/PrivateRoute';
import BlogView from './pages/BlogView';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-blog"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-blog/:slug"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-blogs"
          element={
            <PrivateRoute>
              <MyBlogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/embed-blogs"
          element={
            <PrivateRoute>
              <BlogEmbed />
            </PrivateRoute>
          }
        />
        <Route path="/blog/:slug" element={<BlogView />} />
      </Routes>
    </>
  );
};

export default App;
