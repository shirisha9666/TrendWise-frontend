import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Footer from "./components/Footer";
import ArticleDetail from "./components/article/ArticleDetail";
import Header from "./components/Header";
import ArticleFeed from "./components/article/ArticleFeed";
import { HashRouter  as Router, Routes, Route, Navigate } from "react-router-dom";

import GoogleLogin from "./components/user/GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserHistoryComments from "./components/comments/Comment";
import AdminTable from "./components/admin/AdminTable";
import ArticleCreate from "./components/admin/ArticleCreate";
import ArticleEdit from "./components/admin/ArticleEdit";
import { useUser } from "./userContext";
import toast, { Toaster } from "react-hot-toast";
import Role from "./components/user/Role";

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
    // <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    //   <Header />
    //   <main className="flex-1 container mx-auto px-4 py-8 mt-5">
    //     {/* <ArticleFeed/> */}

    //     <Router>
    //       <Routes>
    //         <Route path="/article/:slug/:id" element={<ArticleDetail />} />
    //         <Route path="/" element={<ArticleFeed />} />
    //         <Route path="/auth/callback" element={<GoogleAuthWrapper />} />
    //         <Route
    //           path="/role"
    //           element={user ? <Role /> : <Navigate to="/" replace />}
    //         />

    //         <Route
    //           path="/comment/history/:id"
    //           element={  <UserHistoryComments />
    //           }
    //         />
    //         <Route
    //           path="/admin"
    //           element={
    //              <AdminTable />
    //           }
    //         />
    //       </Routes>
    //     </Router>
    //   </main>

    //   <Footer />
    //   <Toaster />
    // </div>
     <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 mt-5">
          <Routes>
            <Route path="/" element={<ArticleFeed />} />
            <Route path="/article/:slug/:id" element={<ArticleDetail />} />
            <Route path="/auth/callback" element={<GoogleAuthWrapper />} />
            <Route
              path="/role"
              element={user ? <Role /> : <Navigate to="/" replace />}
            />
            <Route
              path="/comment/history/:id"
              element={user ? <UserHistoryComments /> : <Navigate to="/" replace />}
            />
            <Route
              path="/admin"
              element={user?.role === "admin" ? <AdminTable /> : <Navigate to="/" replace />}
            />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
