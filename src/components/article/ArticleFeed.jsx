import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../userContext";
import { useArticle } from "./articleContext";
import { addComment, likeArticle } from "../../api/api";
import toast from "react-hot-toast";

export default function ArticleFeed() {
  const { user } = useUser();
  const { allarticle, getAllArticlesdata ,viewArticlesdata} = useArticle();
  console.log("allarticle", allarticle);
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentdetails, setcommentDetails] = useState("");

 

  const createcomment = async (id, comment) => {
    if (!comment.trim()) return;
    try {
      const response = await addComment(id, { comment, userId: user._id });
      if (response.status === 200) {
        setcommentDetails(response.data.message);
        setNewComment("");
        toast.success(response.data.message || "Comment Created Successfully");
        getAllArticlesdata();
      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      return [];
    }
  };

  const likesarticles = async (id) => {
    try {
      const response = await likeArticle(id, user._id);
      if (response.status === 200) {
        setcommentDetails(response.data.message);
        setNewComment("");
        toast.success(response.data.message || "Comment Created Successfully");
        getAllArticlesdata();
      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      return [];
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-3xl space-y-8 overflow-y-auto">
        {allarticle.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            <img
              onClick={() => navigate(`/article/${article.slug}/${article?._id}`)}
              src={article.media.images}
              alt={article.title}
              className="w-full h-64 object-cover cursor-pointer"
            />

            {/* Content */}
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {article.desc}
              </p>

              {/* Icons */}
              <div className="flex flex-col gap-2">
                {/* Action Buttons */}
                <div className="flex items-center gap-6 text-gray-500">
                  <button
                    onClick={() => {
                   !user ? navigate("/auth/callback") : null
                      likesarticles(article?._id)
                    }}
                    className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
                  >
                    <FaHeart />
                    <span className="text-sm">{article?.likes.length}</span>
                  </button>

                  <button
                    onClick={() => (!user ? navigate("/auth/callback") : null)}
                    className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer"
                  >
                    <FaComment />
                    {/* <span className="text-sm">26</span> */}
                  </button>
                </div>

                {/* Comment Input - only if logged in */}
                {user && (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={() => createcomment(article?._id, newComment)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
