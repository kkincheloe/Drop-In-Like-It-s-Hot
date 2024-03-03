import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = localStorage.getItem('userToken');

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                
                <div className="nav-links">
                    <Link className="nav-link" to="/">Home</Link>
                    {!isAuthenticated ? (
                        <>
                            <Link className="nav-link" to="/auth/login">Login</Link>
                            <Link className="nav-link" to="/auth/signup">Sign Up</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="nav-link">Logout</button>
                    )}
                </div>
            </div>
            {isMenuOpen && (
                <div className="mobile-nav-links">
                    {!isAuthenticated ? (
                        <>
                            <Link className="nav-link" to="/auth/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                            <Link className="nav-link" to="/auth/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="nav-link">Logout</button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
