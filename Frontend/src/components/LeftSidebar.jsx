import React from 'react';

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
            <a href="#" >Home</a>
          </li>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <a href="#">Liked Videos</a>
          </li>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <a href="#">History</a>
          </li>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <a href="#">My Content</a>
          </li>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <a href="#">Collections</a>
          </li>
          <li className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer border-4 border-red-600  ">
            <a href="#">Subscribers</a>
          </li>
        </ul>
      </div>
      {/* Footer or additional content */}
      <div className="p-4">
        <p className="text-sm">Your footer content</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
