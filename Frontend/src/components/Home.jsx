import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

export default function Home() {
    const [data,setData]=useState({})
    const [loadding,setLodding]=useState(false)
    const [video,setVideo]=useState({})
    useEffect(() => {
     const fetchData=async()=>{

         const d= await axios.get("http://localhost:8000/api/v1/users/current-user",{
            withCredentials: true,
         })
         const v = await axios("http://localhost:8000/api/v1/videos/",{
          withCredentials: true,})
         setVideo(v.data.data)
         setData(d)
         setLodding(true)
     }
     fetchData();
    }, []);

  return (
      <>
      {loadding && 
       <> 
       <Navbar data={data.data} />
      <div className='flex'>
        <LeftSidebar/>
         <RightSidebar videos={video.docs} />
      </div>
      </>
  }
      </>
  )
}
