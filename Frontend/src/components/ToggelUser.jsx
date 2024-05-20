import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function ToggelUser() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const [userVideo, setUserVideo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/c/${id}`,
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
  }, [avatar, coverImage]);

  return (
    <>
      {loading && (
        <div>


          <div className="flex bg-black">
            <LeftSidebar />
            <div className="h-80 w-full">
              <img
                src={coverImage}
                alt=""
                className="h-80 w-full object-cover"
              />

              <div className="flex">
                <div className="flex-row">
                  <img
                    src={avatar}
                    alt=""
                    className="mx-4 mt-2 h-40 w-40 object-cover rounded-full cursor-pointer"
                  />
                </div>

                <div className="">
                  <h1 className="pt-10 px-8 text-white text-5xl">{fullname}</h1>

                  <p className="pt-3 px-8 text-white text-2xl">{email}</p>
                </div>
                <div>
                  <p className="pt-20 mx-9 px-16 text-white text-2xl">
                    {data.data.subscribersCount} subscribers {userVideo.length}{" "}
                    videos
                  </p>
                </div>
                <div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded">
                    Subscribe
                  </button>
                </div>
                <div>
                  <div className="flex flex-col items-center"></div>
                </div>
              </div>

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
