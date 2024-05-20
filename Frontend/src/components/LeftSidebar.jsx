import React from 'react';
import { Link } from 'react-router-dom';
const LeftSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4">
        {/* Logo or branding */}
        <h1 className="text-2xl font-bold">Your Logo</h1>
      </div>

      <div className="flex-grow">
        <ul className="py-4 space-y-5">
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  " >
            <p  >Home</p>
          </li>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <p >Liked Videos</p>
          </li>
         <Link to="/watch-history">

          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <p>Watch History</p>
          </li>
         </Link>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <p >My Content</p>
          </li>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <p >Collections</p>
          </li>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <p >Subscribers</p>
          </li>
        </ul>
      </div>

      <div className="p-4">
        <p className="text-sm">Your footer content</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
