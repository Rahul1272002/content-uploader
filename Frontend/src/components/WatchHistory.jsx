import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function WatchHistory() {
    const [data,setData]=useState({})
    const [loadding,setLodding]=useState(false)

    useEffect(() => {
        const fetchData=async()=>{
            try {
                const history= await axios.get("http://localhost:8000/api/v1/users/history",{
                    withCredentials: true,
                })
                setData(history.data.data)

                setLodding(true)
            } catch (error) {
                setLodding(false)
                console.log(error)
            }
        }
        fetchData();
  

    }, [])

    if(loadding)
    console.log(data)
  return (
    <>
    {loadding &&
         (<div className="bg-gray-800 min-h-screen p-8">
         <h1 className="text-3xl text-white mb-4">Watch History</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {data.map((video) => (
          <Link key={video._id} to={`/v/${video._id}`}>
            <div className='relative rounded-lg shadow-md p-4 bg-black'>
              <img
                src={video.thumbnail.url}
                alt={video.title}
                className='w-full h-40 object-cover rounded-md mb-2'
              />
              <div className='absolute bottom-3 left-0 z-10 p-2 bg-gray-900 rounded-full'>
                <Link to={`user/${video.owner.username}`}>
                <img

                  src={video.owner.avatar}
                  alt={video.username}
                  className='w-12 h-12 rounded-full'
                />
                </Link>
              </div>
              <h3 className='text-lg font-semibold text-white mb-2 mx-14'>{video.title}</h3>
              <p className='text-sm text-white mx-14'>{`${video.description.substring(0,75)}.....`}</p>
            </div>
          </Link>
        ))}
         </div>
       </div>)
    }
   
    </>
   
  )
}
