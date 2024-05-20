import { useState,useEffect } from 'react'
import axios from 'axios'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import VideoPlayer from './components/VideoPlayer';
import User from './components/User';
import ToggelUser from './components/ToggelUser';
import Navbar from './components/Navbar';
import WatchHistory from './components/WatchHistory';
 
function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );

        setData(response.data);
      setIsLoggedIn(true);

        setLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Router>
    <div>

     {
      loading && 
    <Navbar data={data} />

     } 

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/watch-history" element={<WatchHistory/>} />
        <Route path="/v/:id" element={<VideoPlayer/> } />
        <Route path="/:id" element={<User/>} />
        {/* <Route path="watch-history/user/:id" element={<User/>} /> */}
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path='/user/:id' element={<ToggelUser />} />
        <Route path='/watch-history/user/:id' element={<ToggelUser />} />
       
      </Routes>
    </div>
  </Router>
  )
}

export default App
