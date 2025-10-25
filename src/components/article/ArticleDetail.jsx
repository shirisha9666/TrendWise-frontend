import React from "react";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useArticle } from "./articleContext";
const ArticleDetail = () => {
  const { id } = useParams();
  const { viewArticlesdata,viewarticle } = useArticle();
  useEffect(() => {
    viewArticlesdata(id);
  }, [id]);
  console.log("viewarticle",viewarticle)
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 py-10 px-4">
      <section className="w-full max-w-5xl grid gap-10 md:grid-cols-2">
        {/* Left Text Section */}
        <div className="flex flex-col justify-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-3">
             {viewarticle.title}
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {viewarticle.content}
          </p>

          {/* Icons */}
          <div className="flex items-center gap-4 mt-4 text-gray-500">
            <button className="flex items-center gap-1 hover:text-red-500 transition">
              <FaHeart />
              <span className="text-sm">{viewarticle?.likes?.length || 5}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500 transition">
              <FaComment />
              <span className="text-sm">{viewarticle?.comment?.length || 1}</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full flex justify-center items-center">
          <img
            src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
            alt="mountain"
            className="rounded-xl w-full h-auto object-cover shadow-md"
          />
        </div>
      </section>

      {/* Additional Content Below */}
      <div className="w-full max-w-5xl mt-12 space-y-8">
        {[1].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">
             
 {viewarticle?.meta?.description
}
            </h4>
          
              <p className="text-gray-600 leading-relaxed">
              {viewarticle?.slug
}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
