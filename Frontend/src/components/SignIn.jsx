import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie"
import { useDispatch } from 'react-redux';

import {login} from "../store/userSlice"
const SignIn = () => {

    const handleSignOut = () => {
 
        cookie.remove("accessToken");
        cookie.remove("refreshToken");
        dispatch(logout()); // Assuming you have a logout action in your userSlice
        navigate("/sign-in"); // Redirect to sign in page
    };
    const dispatch = useDispatch();

    const cookie =new Cookies();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
const navigate=useNavigate()
    const handleChange = (e) => {
       e.preventDefault()
        const { name, value } = e.target;
        setFormData((prevData) => ({
 
            ...prevData,
            [name]: value,
        }));
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', formData);
            //console.log(response.data.data); 
             cookie.set("accessToken",response.data.data.accessToken)
            cookie.set("refreshToken",response.data.data.refreshToken)
            const user = await axios.get(
                "http://localhost:8000/api/v1/users/current-user",
                {
                  withCredentials: true,
                }
              );
            dispatch(login(user.data.data));
            navigate("/")
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-center font-bold text-2xl mb-4">Sign In</h2>
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
                <div className="mb-6">
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
                <div className="flex items-center justify-between">
                    
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <Link to="/sign-up"  >
                        <p className="text-blue-500 underline ">Create a new account</p>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
