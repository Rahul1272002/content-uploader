import { useState } from 'react'

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import VideoPlayer from './components/VideoPlayer';
import User from './components/User';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/v/:id" element={<VideoPlayer/> } />
        <Route path="/:id" element={<User/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
