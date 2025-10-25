import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Footer from "./components/Footer";
import ArticleDetail from "./components/article/ArticleDetail";
import Header from "./components/Header";
import ArticleFeed from "./components/article/ArticleFeed";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GoogleLogin from "./components/user/GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserHistoryComments from "./components/comments/Comment";
import AdminTable from "./components/admin/AdminTable";
import ArticleCreate from "./components/admin/ArticleCreate";
import ArticleEdit from "./components/admin/ArticleEdit";
import { useUser } from "./userContext";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { user } = useUser();
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="623535156143-jutlumgkaebtr0cod9k4rs7cajme60g4.apps.googleusercontent.com">
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* <ArticleFeed/> */}

        <BrowserRouter>
          <Routes>
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/" element={<ArticleFeed />} />
            <Route path="/login" element={<GoogleAuthWrapper />} />
            <Route
              path="/comment/history/:id"
              element={<UserHistoryComments />}
            />
            {user?.role === "admin" && (
              <Route path="/Admin" element={<AdminTable />} />
            )}
            {user?.role === "admin" && (
              <Route path="/article/create" element={<ArticleCreate />} />
            )}
            {user?.role === "admin" && (
              <Route path="/article/update/:id" element={<ArticleEdit />} />
            )}
          </Routes>
        </BrowserRouter>
      </main>

      <Footer />
           <Toaster />
    </div>
  );
}

export default App;
