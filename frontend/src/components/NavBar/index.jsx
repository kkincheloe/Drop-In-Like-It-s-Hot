import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Make sure this path is correct

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = localStorage.getItem('userToken');

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        window.location.reload();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="menu-icon" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <Link className="nav-link" to="/">Home</Link>
            <div className={`menu-content ${isMenuOpen ? 'active' : ''}`}>
                {!isAuthenticated ? (
                    <>
                        <h1 className="nav-title">LogIn or Sign Up to Leave a Comment</h1>
                        <Link className="nav-link" to="/auth/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        <Link className="nav-link" to="/auth/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    </>
                ) : (
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

