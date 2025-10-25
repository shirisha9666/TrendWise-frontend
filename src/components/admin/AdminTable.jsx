import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useArticle } from "../article/articleContext";


const AdminTable=()=>{
    const navigate=useNavigate()
      const { allarticle, getAllArticlesdata ,deleteArticleData} = useArticle();
      const [articles, setArticles] = useState(["helloword","helo"]);
    return(
          <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl mx-auto">
            <div className="flex justify-between m-3">
        <h2 className="text-xl font-semibold mb-4">Existing Articles</h2>
            <button
                    onClick={() => navigate("/article/create")}
                    className="px-3 py-1 bg-orange-100 text-yellow-800 
                    rounded-md hover:bg-orange-200 transition text-sm cursor-pointer"
                  >
                    Create Article
                  </button>
                  </div>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Slug</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No articles yet
                </td>
              </tr>
            )}
            {allarticle.map((article, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{article.title}</td>
                <td className="border border-gray-300 px-4 py-2">{article.slug}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/article/update/${article._id}`)}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition text-sm cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteArticleData(article._id)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition text-sm cursor-pointer"
                  >
                    Delete
                  </button>
                        <button
                    onClick={() => navigate(`/article/${article._id}`)}
                    className="px-3 py-1 bg-green-100 text-yellow-800 
                    rounded-md hover:bg-green-200 transition text-sm cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default AdminTable