import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
export default function VideoPlayer() {
    const { id } = useParams(); 
    const [loadding,setLoadding]=useState(false)
    const [video,setVideo]=useState({})
    const [allvideo,setAllvideo]=useState({})
    const [data,setData]=useState({})
    const[islike,setIslike]=useState(false)
    const[likeCount,setLikeCount]=useState(0)
     useEffect(()=>{
       const videoFetch=async()=>{

           try {
            const d= await axios.get("http://localhost:8000/api/v1/users/current-user",{
                withCredentials: true,
             })
             const res=await axios.get(`http://localhost:8000/api/v1/videos//v/${id}`,{
                 withCredentials: true,
                })
                const v = await axios("http://localhost:8000/api/v1/videos/",{
          withCredentials: true,})
            const responseLike=await axios.get(`http://localhost:8000/api/v1/likes//is-like/v/${id}`,{
            withCredentials: true,
           })
           setIslike(responseLike.data.data.isLiked)
           setLikeCount(responseLike.data.data.videoCount)
        // setIslike(response.data.data.isLiked)
         setAllvideo(v.data.data.docs)
                setData(d)
                setVideo(res.data)
            

                setLoadding(true)
            } catch (error) {
               setLoadding(false)
           }
       } 
       videoFetch()
     },[id])
     if(loadding)
     console.log(video)
      const handleLike=async()=>{
        const response=await axios.post(`http://localhost:8000/api/v1/likes//toggle/v/${id}`,null,{
            withCredentials: true,
           })
        setIslike(response.data.data.isLiked)
        
        const responseLike=await axios.get(`http://localhost:8000/api/v1/likes//is-like/v/${id}`,{
            withCredentials: true,
           })
           setLikeCount(responseLike.data.data.videoCount)
    }
  return (
    <>
    {loadding && (
      <>  
    <Navbar data={data.data}/>
    <div className='flex bg-slate-600 '>
      
        <div className="container  flex-row mx-4 mt-6">
            <div className="flex h-fit  ">
                <ReactPlayer
                    url={video.data.videoFile.url}
                    controls={true}
                    width="90%"
                   
                    className="shadow-lg rounded-lg h-full"
                    playing={true}
                />
           
            </div>

            <div className="flex items-center mt-4  ">


                    <img
                    src={video.data.owner.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"

                    />
                    
        
        
            <div className="ml-4 flex justify-between items-center">
                <div className='flex-row'>
                    <h2 className="text-xl font-semibold text-white">{video.data.owner.username}</h2>
                    <p className='text-white'>12.2k subscribers</p>
                </div>  
              <div className="flex items-center mx-4  mt-2">
                <button className="bg-red-500 px-4 py-2 rounded-lg text-white mr-4">
                  Subscribe
                </button>
                
                <button
  className={`bg-gray-700 px-4 py-2 rounded-lg text-white ${islike ? 'bg-green-600' : ''}`}
  onClick={handleLike}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-1"
    viewBox="0 0 24 24"
  >
    <path
      d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"
    ></path>
  </svg>
  Like {likeCount}
</button>
              </div>
            
            </div>
            
          </div>
        
          <div className="mt-4 flex gap-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-green-500 px-4 py-2 rounded-lg text-white mt-2">
                  Add Comment
                </button>
              </div>
        </div>
        <div className=''>
      {allvideo.map((video) => (
        <Link key={video._id} to={`/v/${video._id}`}>
          <div className='relative rounded-lg shadow-md w-80 p-7 bg-black flex mb-1'>
            <img
              src={video.thumbnail.url}
              alt={video.title}
              className='w-15 h-20 object-cover rounded-md  mr-4'   
            />
            <p className='text-white mb-2'>{video.title}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</>
    )}
    </>
  );
}
