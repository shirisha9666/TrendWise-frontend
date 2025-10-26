import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import {
  addComment,
  deleteArticle,
  delteComment,
  getAllArticles,
  getCurrentUser,
  getusercommenthistory,
  ViewArticles,
} from "../../api/api";
import toast from "react-hot-toast";


const ArticleContent = createContext(null);

export const ArticleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
   


  const [allarticle, setAllArticleData] = useState([]);
  const [viewarticle, setViewArticle] = useState([]);
  const [delcommentdetails, setdelcommentDetails] = useState("");
  const [allcomment, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articleLoading,setArticleLoding]=useState(false)
  const viewArticlesdata = async (id) => {
    try {
      const response = await ViewArticles(id);
      if (response.status === 200) {
        setViewArticle(response.data.article);
      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      const mes = error.response.data.message;
      toast.error(msg);
      console.error("Error fetching articles:", error.message);
      return [];
    }
  };

  const getAllArticlesdata = async () => {
    try {
      setArticleLoding(true)
      const response = await getAllArticles();
      if (response.status === 200) {
        setAllArticleData(response.data.article);
      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      return [];
    }finally{
      setArticleLoding(false)
    }
  };

  const deleteArticleData = async (id) => {
    console.log("delete", id);
    try {
      const response = await deleteArticle(id);
      if (response.status === 200) {
        setdelcommentDetails(response.data.message);
        await getAllArticlesdata();
        toast.success(response.data.message || "Article Deleted successfully");
      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      return [];
    }
  };

  const getusercomment = async (id) => {
    try {
      const response = await getusercommenthistory(id);

      if (response.status === 200) {
        setAllComments(response?.data?.commentHistroy);
      } else {
        console.error("Failed to fetch articles:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      return [];
    }
  };

 

  useEffect(() => {
    getAllArticlesdata();
 
  }, []);

  return (
    <ArticleContent.Provider
      value={{
        user,
        loading,
        allarticle,
        getAllArticlesdata,
        viewArticlesdata,
        viewarticle,
        deleteArticleData,
      articleLoading,
        allcomment,
        getusercomment,
      }}
    >
      {children}
    </ArticleContent.Provider>
  );
};

export const useArticle = () => useContext(ArticleContent);
