import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../assets/styles/Navbar.css';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className='navbar-brand-link'>Embeddr</Link>
            </div>
            <div className="navbar-menu">
                {isAuthenticated ? (
                    <>
                        <Link to="/create-blog" className='navbar-menu-links'>Create Blog</Link>
                        <Link to="/my-blogs" className='navbar-menu-links'>My Blogs</Link>
                        <Link to="/embed-blogs" className='navbar-menu-links'>Embed Blogs</Link>
                        <button onClick={handleLogout} className='logoutBtn'>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className='navbar-menu-links'>Login</Link>
                        <Link to="/register" className='navbar-menu-links'>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 