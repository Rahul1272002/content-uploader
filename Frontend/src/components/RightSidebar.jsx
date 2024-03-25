import React from 'react';
import { Link } from 'react-router-dom';

export default function RightSidebar({ videos }) {

  return (
    <div className='bg-slate-600 w-full'>
      <div className='grid grid-cols-3 gap-4 px-4 py-2 bg-slate-600'>
        {videos.map((video) => (
          <Link key={video._id} to={`/v/${video._id}`}>
            <div className='relative rounded-lg shadow-md p-4 bg-black'>
              <img
                src={video.thumbnail.url}
                alt={video.title}
                className='w-full h-40 object-cover rounded-md mb-2'
              />
              <div className='absolute bottom-3 left-0 z-10 p-2 bg-gray-900 rounded-full'>
                <img
                  src={video.ownerDetails.avatar}
                  alt={video.username}
                  className='w-12 h-12 rounded-full'
                />
              </div>
              <h3 className='text-lg font-semibold text-white mb-2 mx-14'>{video.title}</h3>
              <p className='text-sm text-white mx-14'>{`${video.description.substring(0,75)}.....`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
