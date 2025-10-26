import React, { useEffect, useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  delteComment,
  getusercommenthistory,
  updateComment,
} from "../../api/api";
import { useUser } from "../../userContext";
import toast from "react-hot-toast";
import { useArticle } from "../article/articleContext";

export default function UserHistoryComments() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { allcomment, getusercomment } = useArticle();
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isloadingedit, setIsloadingedit] = useState(null);
  const [isloadingdel, setIsloadingdel] = useState(null);

  const { id } = useParams();

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async (id) => {
    setIsloadingedit(id);
    try {
      const data = {
        comment,
        userId: user._id,
      };
      console.log("data", data);
      const response = await updateComment(id, data);
      if (response.status === 200) {
        toast.success(response.data.message || "Article Updated Successfully");
        await getusercomment(user._id);
        setIsEditing(false);
      } else {
        toast.error("Failed to update comment");
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      console.log("error", error);
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setIsloadingedit(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsloadingdel(id);
      const response = await delteComment(id);
      if (response.status === 200) {
        await getusercomment(user._id);
        toast.success(response.data.message || "Article Deleted successfully");
      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      const msg = error.response.data.message;
      console.error("Error fetching articles:", error.message);
      console.error(msg || "Somthing wrong while deleting comment");
      return [];
    } finally {
      setIsloadingdel(null);
    }
  };

  // Example data (you can replace this with your real article data)
  const articles = [
    {
      id: 1,
      title: "Exploring the Mountains",
      desc: "Experience the breathtaking views and adventures that await in the highlands.",
      img: "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
    },
    {
      id: 2,
      title: "City Lights and Nightlife",
      desc: "Discover the magic of city life and vibrant streets that never sleep.",
      img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1000&q=80",
    },
    {
      id: 3,
      title: "Peaceful Beach Getaway",
      desc: "Relax by the sea and enjoy calm sunsets with the sound of waves.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",
    },
  ];
  useEffect(() => {
    getusercomment(id);
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-3xl space-y-8 overflow-y-auto">
        {allcomment.length === 0 ? (
          <div>No Comments Found</div>
        ) : (
          allcomment.map((commentv) => {
            console.log("commentv", commentv);
            return (
              <div
                key={commentv._id}
                className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  onClick={() =>
                    navigate(
                      `/article/${commentv.slug}/${commentv.articleId._id}`
                    )
                  }
                  src={
                    commentv?.articleId?.meta?.ogImage ||
                    commentv?.articleId?.media?.images?.[0] ||
                    "/default.jpg"
                  }
                  alt={commentv?.articleId?.title}
                  className="w-full h-64 object-cover cursor-pointer"
                />

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {commentv?.articleId?.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {commentv?.articleId?.desc}
                  </p>

                  {/* Icons */}
                  <div className="flex flex-col gap-2 w-full max-w-md bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between text-gray-500">
                      {/* Comment Text */}
                      {isEditing ? (
                        <input
                          placeholder="Enter your comment"
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      ) : (
                        <span className="text-sm">{commentv.comment}</span>
                      )}

                      {/* Edit/Delete Buttons */}
                      <div className="flex gap-5">
                        {isEditing ? (
                          <button
                            onClick={() => handleSave(commentv?._id)}
                            className="px-3 py-1 cursor-pointer m-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={handleEdit}
                            className="px-3 cursor-pointer py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition text-sm font-medium"
                          >
                            {isloadingedit === commentv._id
                              ? "Updating..."
                              : "Update"}
                          </button>
                        )}

                        {!isEditing && (
                          <button
                            onClick={() => handleDelete(commentv._id)}
                            className="px-3 py-1 cursor-pointer bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition text-sm font-medium"
                          >
                            {isloadingdel === commentv._id
                              ? "Deleting...."
                              : "Delete"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
