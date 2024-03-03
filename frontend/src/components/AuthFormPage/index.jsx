import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signUp, logIn } from '../../../utils/backend'; 
import './styles.css'

function AuthFormPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { formType } = useParams(); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = formType === 'signup' ? await signUp(formData) : await logIn(formData);
            localStorage.setItem('userToken', response.token);
            navigate('/'); 
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return (
        <div className="auth-form-container">
            <div className="auth-form-box">
                <h1 className="auth-form-title">{formType === 'signup' ? 'Sign Up' : 'Log In'}</h1>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="flex items-center justify-between">
                        <button type="submit" className="auth-form-button">
                        {formType === 'signup' ? 'Sign Up' : 'Log In'}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default AuthFormPage;

