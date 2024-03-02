// src/components/NavBar/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('userToken'); // Adjust based on how you handle authentication

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        window.location.reload(); // For immediate UI update, consider using context or global state for a more elegant solution
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'rgb(203, 183, 243)' }}>
            <Link to="/">Home</Link>
            {!isAuthenticated ? (
                <>
                    <Link to="/auth/login">Login</Link>
                    <Link to="/auth/signup">Sign Up</Link>
                </>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </nav>
    );
};

export default Navbar;
