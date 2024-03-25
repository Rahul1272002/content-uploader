import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Navbar({data}) {
const navigate=useNavigate()
    const handleUser=()=>{
            navigate(`/:${data.data._id}`)
    }
  // console.log(data.data)
  const signOut=async()=>{
    try {
      
      await axios.post("http://localhost:8000/api/v1/users/logout",null,{ withCredentials: true })
      navigate("/sign-in")
    } catch (error) {
      console.log("hello")
    }
  }
    return (
        <nav className="bg-gray-900 text-white p-2 ">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <svg
                className="w-8 h-8 text-red-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
       
                <path
                  fill="currentColor"
                  d="M12 2C6.486 2 2 6.487 2 12s4.486 10 10 10 10-4.487 10-10S17.514 2 12 2zm0 16.667l-5.75-4.167L12 8.835v9.832z"
                />
              </svg>
              <span className="text-xl font-bold">Uploader</span>
            </div>
    
     
            <input
              type="text"
              placeholder="Search..."
              className="px-10 py-2 bg-gray-800 text-white rounded-md w-64 focus:outline-none"
            />
    
          
            <div className="flex items-center gap-8 ">
              
              <img
                src={data.data.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover cursor-pointer "
                onClick={handleUser}
              />
              <button onClick={signOut} className=" bg-red-600 rounded-lg p-2  ">Sign Out</button>
            </div>
          </div>
        </nav>
      );
}
