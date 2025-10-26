import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useArticle } from "../article/articleContext";
import { updateArticle } from "../../api/api";
import toast from "react-hot-toast";
const ArticleEdit=()=>{
   const [contentType, setContentType] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [loading,setLoading]=useState(false)
  const {getAllArticlesdata}=useArticle()
  const navigate=useNavigate()
  const {id}=useParams()

  const handleUpdate = async (id) => {
    try {
      setLoading(true)
      const response = await updateArticle(id);
      if (response.status === 200) {
     
        setContentType("");
        toast.success(response.data.message || "Article Updated Successfully");
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

return(
     <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-4">Update Article</h2>
       
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
          {loading  ? "Update..." : "Update"}
        </button>
      </div>
)
}

export default ArticleEdit