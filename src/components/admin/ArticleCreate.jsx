import React, { useState } from "react";
import { createArticle } from "../../api/api";
import { useArticle } from "../article/articleContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ArticleCreate = () => {

  const [contentType, setContentType] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [loading,setLoading]=useState(false)
  const {getAllArticlesdata}=useArticle()
  const navigate=useNavigate()

  const handleSave = async () => {
    try {
      setLoading(true)
      const response = await createArticle(contentType);
      if (response.status === 200) {
     
        setContentType("");
        toast.success(response.data.message || "Article Created Successfully");
       await getAllArticlesdata();
       navigate("/")

      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      return [];
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Article</h2>
      {/* <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
          className="w-full mb-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        /> */}
      <select
        value={contentType}
        onChange={(e) => setContentType(e.target.value)}
        className="w-full mb-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="articles">Articles</option>
        <option value="images">Image</option>
        <option value="videos">Video</option>
      </select>
      <button
        onClick={()=>handleSave()}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : "Save"}

      </button>
    </div>
  );
};

export default ArticleCreate;
