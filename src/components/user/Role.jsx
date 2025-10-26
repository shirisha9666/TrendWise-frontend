import React, { useState } from "react";
import { createArticle, registerRole } from "../../api/api";
import { useArticle } from "../article/articleContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../userContext";
const Role = () => {
  const [role, setRole] = useState("");
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const { getAllArticlesdata } = useArticle();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      setLoading(true);
      const userId = user?._id;
      const data = {
          role,
        userId,
      
      };
      console.log("data",data)
      const response = await registerRole(data);
      if (response.status === 200) {
        setRole("");
        toast.success(response.data.message || "Role Created Successfully");
        await getAllArticlesdata();
        navigate("/");
      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4">Register Your Role</h2>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button
        onClick={() => handleSave()}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default Role;
