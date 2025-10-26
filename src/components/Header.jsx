import React, { useState } from "react";
import { useUser } from "../userContext";

const Header = () => {
 const {user}=useUser()

 console.log("user",user)
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
            TW
          </div>
          <a href="/" className="text-xl font-semibold">
            TrendWise
          </a>
        </div>

        {/* <nav className="hidden sm:flex gap-4 items-center">
          <a className="text-sm hover:text-blue-600" href="/">Home</a>
          <a className="text-sm hover:text-blue-600" href="/#">Topics</a>
          <a className="text-sm hover:text-blue-600" href="/#">About</a>
        </nav> */}

        <div className="flex items-center gap-3">
      {/* If user not logged in */}
      {/* {!user && (
        <a href="/login">
          <button className="hidden sm:inline px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm cursor-pointer">
            Login
          </button>
        </a>
      )} */}

      {/* If user is logged in and role is 'USER' */}
      {user?.role === "user" && (
        <a href={`/comment/history/${user?._id}`}>
          <button className="hidden sm:inline px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm cursor-pointer">
            Comment History
          </button>
        </a>
      )}

      {/* If user is logged in and role is 'ADMIN' */}
      {user?.role === "admin" && (
        <a href="/admin">
          <button className="hidden sm:inline px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm cursor-pointer">
            Admin
          </button>
        </a>
      )}
    </div>
      </div>
    </header>
  );
};

export default Header;
