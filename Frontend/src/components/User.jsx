import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [editingName, setEditingName] = useState(false); // State for toggling name editing
  const [editingEmail, setEditingEmail] = useState(false); // State for toggling email editing
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [userVideo, setUserVideo] = useState({});
  const [publish, setPublish] = useState({});
  const [response, setResponse] = useState({});
  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/change-password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      console.log("Password changed successfully:", response.data);
    
    } catch (error) {
      console.error("Error changing password:", error);
 
    }
  };
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
        console.log(response.data.data);
        setAvatar(response?.data.data.avatar || "");
        setCoverImage(response?.data.data.coverImage || "");
        setFullname(response?.data.data.fullName || "");
        setEmail(response?.data.data.email || "");
        const video = await axios.get(
          `http://localhost:8000/api/v1/videos/user-video/${response.data.data._id}`,
          {
            withCredentials: true,
          }
        );

        setUserVideo(video.data.data);

        setLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [avatar, coverImage, publish,response]);
  if (loading) console.log(userVideo);
  const handleEditCoverImage = async (e) => {
    const formData = new FormData();
    formData.append("coverImage", e.target.files[0]);

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/cover-image",
        formData,
        {
          withCredentials: true,
        }
      );

      setCoverImage(response?.data.coverImage);
      console.log("Cover image updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating cover image:", error);
    }
  };

  const handleEditAvatar = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/avatar",
        formData,
        {
          withCredentials: true,
        }
      );

      setAvatar(response?.data.avatar);
      console.log("Avatar updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/update-account",
        { fullName: fullname, email },
        {
          withCredentials: true,
        }
      );
      setFullname(fullname);
      setEmail(email);
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnailFile);
      formData.append("title", title);
      formData.append("description", description);

      const res = await axios.post(
        "http://localhost:8000/api/v1/videos/",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) setShowModal(false);

        setResponse(res)
    } catch (error) {
      console.error("Error uploading files:", error);
      // Add logic to handle upload errors
    }
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleNameEdit = () => {
    setEditingName(true);
  };

  const handleEmailEdit = () => {
    setEditingEmail(true);
  };

  const handlePublish = async (videoID) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/videos/toggle/publish/${videoID}`,
        null,
        {
          withCredentials: true,
        }
      );
      setPublish(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVideo = async (videoID) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/videos/v/${videoID}`,
        {
          withCredentials: true,
        }
      );

      setPublish(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && (
        <div>


          <div className="flex bg-black">
            <LeftSidebar />
            <div className="h-80 w-full">
              <input
                type="file"
                className="hidden"
                id="coverImageInput"
                onChange={handleEditCoverImage}
              />
              <img
                src={coverImage}
                alt=""
                className="h-80 w-full object-cover"
              />
              <button
                className="text-white flex gap-2 items-center justify-center"
                onClick={() =>
                  document.getElementById("coverImageInput").click()
                }
              >
                <CiEdit className="" /> edit
              </button>

              <div className="flex">
                <div className="flex-row">
                  <input
                    type="file"
                    className="hidden"
                    id="avatarInput"
                    onChange={handleEditAvatar}
                  />
                  <img
                    src={avatar}
                    alt=""
                    className="mx-4 mt-2 h-40 w-40 object-cover rounded-full cursor-pointer"
                  />

                  <button
                    className="text-white mx-16 flex gap-2 items-center justify-center"
                    onClick={() =>
                      document.getElementById("avatarInput").click()
                    }
                  >
                    <CiEdit className="" /> edit
                  </button>
                </div>

                <div className="">
                  {editingName ? (
                    <input
                      type="text"
                      className="border border-gray-300 px-3 py-2 mb-4"
                      placeholder="Full Name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      onBlur={() => setEditingName(false)}
                    />
                  ) : (
                    <h1
                      className="pt-10 px-8 text-white text-5xl"
                      onClick={handleNameEdit}
                    >
                      {fullname}
                    </h1>
                  )}

                  {editingEmail ? (
                    <input
                      type="email"
                      className="border border-gray-300 px-3 py-2 mb-4"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEditingEmail(false)}
                    />
                  ) : (
                    <p
                      className="pt-3 px-8 text-white text-2xl"
                      onClick={handleEmailEdit}
                    >
                      {email}
                    </p>
                  )}

                  <div className="flex">
                    <button
                      onClick={handleEditProfile}
                      className="text-white bg-blue-500 px-4 py-2  rounded-lg mx-16 mt-5"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div>
                  <p className="pt-20 mx-9 px-16 text-white text-2xl">
                    subscribers {userVideo.length} videos
                  </p>
                </div>
                <div>
                  <div className="flex flex-col items-center">
                    {isChange ? (
                      <>
                        <div className="flex">
                          <input
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="border border-gray-300 px-2 py-2 mb-4 rounded-md mt-8 mx-2"
                          />
                          <button
                            className=""
                            onClick={() => setIsChange(false)}
                          >
                            <IoClose className="bg-red-700 " />
                          </button>
                        </div>

                        <input
                          type="password"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="border border-gray-300 px-2 py-2 mb-4 rounded-md"
                        />
                        <button
                          onClick={handleChangePassword}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Change Password
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsChange(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Change Password
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleOpen}
                className="text-white text-3xl bg-green-900 p-2 mt-4 rounded mx-2"
              >
                Upload
              </button>

              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={() => setShowModal(false)}
                  ></div>
                  <div className="bg-white p-8 rounded-lg z-50">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-semibold">
                        Upload Video & Thumbnail
                      </h2>
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
              <h1 className="text-white text-3xl mt-2 mx-3 underline  hover:text-blue-700 ">
                Video
              </h1>
              {loading && (
                <div className="grid grid-cols-3 gap-4 px-4 py-2 bg-slate-600">
                  {userVideo.map((video) => (
                    <div
                      key={video._id}
                      className="relative rounded-lg shadow-md p-4 bg-black"
                    >
                      <Link to={`/v/${video._id}`}>
                        <img
                          src={video.thumbnail.url}
                          alt="Thumbnail"
                          className="w-full h-40 object-cover rounded-md mb-2"
                        />
                        <div className="absolute bottom-3 left-0 z-10 p-2 bg-gray-900 rounded-full">
                          <img
                            src={avatar}
                            alt="Avatar"
                            className="w-12 h-12 rounded-full"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 mx-14">
                          {video.title}
                        </h3>
                        <p className="text-sm text-white mx-14">{`${video.description.substring(
                          0,
                          75
                        )}.....`}</p>
                      </Link>
                      <div className="flex justify-between items-center mt-4 mx-14">
                        <button
                          onClick={() => handleDeleteVideo(video._id)}
                          className="text-white bg-red-500 px-3 py-1 rounded-md mr-2"
                        >
                          Delete
                        </button>
                        {video.isPublished ? (
                          <button
                            onClick={() => handlePublish(video._id)}
                            className="text-white bg-red-500 px-3 py-1 rounded-md"
                          >
                            Unpublish
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePublish(video._id)}
                            className="text-white bg-green-500 px-3 py-1 rounded-md"
                          >
                            Publish
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
