import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Cookie from 'universal-cookie';
export default function Home() {
   const cookie=new Cookie()
    const [data,setData]=useState({})
    const [loadding,setLodding]=useState(false)
    const [video,setVideo]=useState({})
    useEffect(() => {
     const fetchData=async()=>{
        try {
          
          const d= await axios.get("http://localhost:8000/api/v1/users/current-user",{
             withCredentials: true,
          })
          setData(d)

          const v = await axios.get("http://localhost:8000/api/v1/videos/",{
           withCredentials: true})
          setVideo(v.data.data)

        
          setLodding(true)
        } catch (error) {
          setLodding(false)
        }
     }
     fetchData();
    }, []);
// useEffect(()=>{

//      const refresh=async()=>{
//       try {
    
//         const refreshTokenGenarate=await axios.post("http://localhost:8000/api/v1/users/refresh-token",{
//           withCredentials: true})
//           console.log("hi",refreshTokenGenarate.data.data.accessToken)
//           cookie.set("accessToken",refreshTokenGenarate.data.data.accessToken)
//           cookie.set("refreshToken",refreshTokenGenarate.data.data.refreshToken)
//       } catch (error) {
//         console.log(error)
//       }
//      }
//      refresh()
// },[])
  return (
      <>
      {loadding && 


      <div className='flex'>
        <LeftSidebar/>
         <RightSidebar videos={video.docs} />
      </div>
     
  }
      </>
  )
}
