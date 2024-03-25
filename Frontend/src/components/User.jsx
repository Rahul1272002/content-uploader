import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function User() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const[open,setOpen]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/current-user", {
          withCredentials: true,
        });
        // await axios.get("http://localhost:8000/api/v1/videos/")
        setData(response.data);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
const handleUpdateavatar=()=>{
  setOpen(true)
}
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnailFile);
      formData.append("title", title);
      formData.append("description", description);

      const res= await axios.post("http://localhost:8000/api/v1/videos/", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      if(res.status===200)
           setShowModal(false)
    
      // Add logic to handle successful upload
    } catch (error) {
      console.error("Error uploading files:", error);
      // Add logic to handle upload errors
    }
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  return (
    <div>
      {loading && <Navbar data={data} />}

      <div className="flex bg-black">
        <LeftSidebar />
        <div className="h-80 w-full ">
          <img
            src={
              loading && data.data.coverImage ||
              "https://yt3.googleusercontent.com/ytc/AIdro_k2wsQa2j9sAhjS25DyZxrhAGDJWtNZBYcLVd3uqQ=s176-c-k-c0x00ffffff-no-rj"
            }
            alt=""
            className="h-80 w-full object-cover"
          />
          <div className="flex">
            <img
              src={
                loading && data.data.avatar ||
                "https://yt3.googleusercontent.com/ytc/AIdro_k2wsQa2j9sAhjS25DyZxrhAGDJWtNZBYcLVd3uqQ=s176-c-k-c0x00ffffff-no-rj"
              }
              alt=""
              className="mx-4 mt-6 h-40 w-40 object-cover rounded-full"
              onClick={handleUpdateavatar}
            />
            
            <div>
              <h1 className="pt-10 px-10 text-white text-5xl">
                {loading && data.data.fullName}
              </h1>
              <p className="pt-3 px-5 text-white text-2xl">
                {loading && data.data.email}. 20k subscribers 40 videos
              </p>
            </div>
          </div>
          <button
            onClick={handleOpen}
            className="text-white text-3xl bg-green-900 p-2 mt-4 rounded mx-2"
          >
            Upload
          </button>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={() => setShowModal(false)}
              ></div>
              <div className="bg-white p-8 rounded-lg z-50">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Upload Video & Thumbnail</h2>
                  <button
                    className="text-gray-600"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                <input
                  type="file"
                  className="border border-gray-300 px-3 py-2 mb-4"
                  placeholder="Upload Video"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
                <input
                  type="file"
                  className="border border-gray-300 px-3 py-2 mb-4"
                  placeholder="Upload Thumbnail"
                  onChange={(e) => setThumbnailFile(e.target.files[0])}
                />
                <input
                  type="text"
                  className="border border-gray-300 px-3 py-2 mb-4"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="border border-gray-300 px-3 py-2 mb-4"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  onClick={handleUpload}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        <h1 className="text-white text-3xl mt-2 mx-3 underline  hover:text-blue-700 ">Video</h1>
        <div>
          
        </div>
        </div>
      </div>
    </div>
  );
}