import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { Link } from "react-router-dom";
 
export default function VideoPlayer() {
  const { id } = useParams();
  const [loadding, setLoadding] = useState(false);
  const [video, setVideo] = useState({});
  const [allvideo, setAllvideo] = useState({});
  const [data, setData] = useState({});
  const [islike, setIslike] = useState(false);
  const [issubscribed, setIssubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [videoComments, setVideoComments] = useState({});
  const [likeComment, setLikeComment] = useState({});
  const [deleteComment, setDeleteComment] = useState({});
  useEffect(() => {
    const videoFetch = async () => {
      try {
        const d = await axios.get(
          "http://localhost:8000/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );
        setData(d);

        const res = await axios.get(
          `http://localhost:8000/api/v1/videos/v/${id}`,
          {
            withCredentials: true,
          }
        );
        setVideo(res.data);
        setIslike(res.data.data.isLiked);
        setLikeCount(res.data.data.likesCount);
        setIssubscribed(res.data.data.owner.isSubscribed);
        setSubscribersCount(res.data.data.owner.subscribersCount);
        // console.log(res.data.data.likesCount)

        const v = await axios.get("http://localhost:8000/api/v1/videos/", {
          withCredentials: true,
        });
        setAllvideo(v.data.data.docs);

        const comment = await axios.get(
          `http://localhost:8000/api/v1/comment/${id}`,
          {
            withCredentials: true,
          }
        );

        setVideoComments(comment.data.data.docs);
        setLoadding(true);
      } catch (error) {
        setLoadding(false);
      }
    };
    videoFetch();
  }, [id, islike, issubscribed, commentText, likeComment,deleteComment]);

  // console.log("data", data);
  // console.log("Comments", videoComments);
console.log("video",video)
  const handleLike = async () => {
    const response = await axios.post(
      `http://localhost:8000/api/v1/likes/toggle/v/${id}`,
      null,
      {
        withCredentials: true,
      }
    );
    setIslike(response.data.data.isLiked);
  
  };

  const handlesubscribe = async () => {
    const res = await axios.post(
      `http://localhost:8000/api/v1/subscriptions/c/${video.data.owner._id}`,
      null,
      {
        withCredentials: true,
      }
    );
    setIssubscribed(res.data.data.subscribed);
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/comment/${id}`,
        { content: commentText },
        { withCredentials: true }
      );
      console.log("Comment added:", response.data);

      setCommentText(response.data.content);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/c/${commentId}`,
        null,
        { withCredentials: true }
      );
      setLikeComment(res.data.data.sucess);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async (commentId) => {};

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/comment/c/${commentId}`,
        { withCredentials: true }
      );
     setDeleteComment(res)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loadding && (
        <>

          <div className="flex bg-slate-600 ">
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
                  <div className="flex-row">
                    <h2 className="text-xl font-semibold text-white">
                      {video.data.owner.username}
                    </h2>
                    <p className="text-white">{subscribersCount} subscribers</p>
                    <p className="text-white">{video.data.views.length} views</p>
                  </div>
                  <div className="flex items-center mx-4  mt-2">
                 
                    {issubscribed ? (
                      <button
                        className={`bg-red-500 px-4 py-2 rounded-lg text-white mr-4 `}
                        onClick={handlesubscribe}
                      >
                        Unsubscribe
                      </button>
                    ) : (
                      <button
                        className={`bg-green-600 px-4 py-2 rounded-lg text-white mr-4`}
                        onClick={handlesubscribe}
                      >
                        Subscribe
                      </button>
                    )}

                    <button
                      className={`bg-gray-700 px-4 py-2 rounded-lg text-white ${
                        islike ? "bg-green-600" : ""
                      }`}
                      onClick={handleLike}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path>
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
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  className="bg-green-500 px-4 py-2 rounded-lg text-white mt-2"
                  onClick={handleAddComment}
                >
                  Add Comment
                </button>
              </div>
              {videoComments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start space-x-4 mt-3"
                >
                  <img
                    src={comment?.owner.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center">
           
                      <p className="text-white ml-1">
                        @{comment.owner.username}
                      </p>
                      <p className="text-white ml-1">- {comment.createdAt}</p>
                    </div>
                    <p className="mt-1 font-bold">{comment.content}</p>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => handleLikeComment(comment._id)}
                        className={`text-white mr-2 ${
                          comment.isLiked ? "text-green-600" : ""
                        }`}
                      >
                        Like
                      </button>
                      <span className="text-white">
                        {comment.likesCount} Likes
                      </span>
                      {data.data.data.username === comment.owner.username && (
                        <>
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="text-white ml-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-white ml-2"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              {allvideo.map((video) => (
                <Link key={video._id} to={`/v/${video._id}`}>
                  <div className="relative rounded-lg shadow-md w-80 p-7 bg-black flex mb-1">
                    <img
                      src={video.thumbnail.url}
                      alt={video.title}
                      className="w-15 h-20 object-cover rounded-md  mr-4"
                    />
                    <p className="text-white mb-2">{video.title}</p>
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
