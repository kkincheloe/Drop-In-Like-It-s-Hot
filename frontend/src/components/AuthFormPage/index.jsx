import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signUp, logIn } from '../../../utils/backend'; // Adjust the import path based on your project structure

function AuthFormPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { formType } = useParams(); // 'signup' or 'login'
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
            navigate('/'); // Navigate to homepage or dashboard after successful login/signup
        } catch (error) {
            console.error('Authentication error:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow p-8 m-4 max-w-lg w-full">
                <h1 className="text-xl font-bold mb-4">{formType === 'signup' ? 'Sign Up' : 'Log In'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {formType === 'signup' ? 'Sign Up' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthFormPage;
