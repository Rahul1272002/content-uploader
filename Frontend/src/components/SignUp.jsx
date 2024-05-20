import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        avatar: null,
        coverImage: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('avatar', formData.avatar);
            formDataToSend.append('coverImage', formData.coverImage);

            const response = await axios.post('http://localhost:8000/api/v1/users/register', formDataToSend);
     
            console.log(response.data); 
            navigate("/sign-in")
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-center font-bold text-2xl mb-4">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
                        Avatar
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="avatar"
                        type="file"
                        name="avatar"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                        Cover Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="coverImage"
                        type="file"
                        name="coverImage"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <Link to="/sign-in"  >
                        <p className="text-blue-500 underline ">Already have an account</p>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
