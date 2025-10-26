import React, { useState } from "react";
import { useUser } from "../userContext";
import toast from "react-hot-toast";
import { getCurrentUser } from "../api/api";
const Header = () => {
  const { user, fetchUser } = useUser();
  console.log("user.Header",user)
  const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("user-info");
      await fetchUser();
 toast.success("LogOut Sccessfully");
    } catch (error) {
      toast.error("Somthing went Wrong");
    } finally {
      setLoading(false);
    }
  };

  console.log("user", user);
  return (
    // <header className="bg-white shadow-sm">
    //   <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    //     <div className="flex items-center gap-3">
    //       <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
    //         TW
    //       </div>
    //       <a href="/" className="text-xl font-semibold">
    //         TrendWise
    //       </a>
    //     </div>

    //     {/* <nav className="hidden sm:flex gap-4 items-center">
    //       <a className="text-sm hover:text-blue-600" href="/">Home</a>
    //       <a className="text-sm hover:text-blue-600" href="/#">Topics</a>
    //       <a className="text-sm hover:text-blue-600" href="/#">About</a>
    //     </nav> */}

    //     <div className="flex items-center gap-3">
    //       {/* If user is logged in and role is 'USER' */}
    //       {user?.role === "user" && (
    //         <a href={`/comment/history/${user?._id}`}>
    //           <button className="hidden sm:inline px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm cursor-pointer">
    //             Comment History
    //           </button>
    //         </a>
    //       )}

    //       {/* If user is logged in and role is 'ADMIN' */}
    //       {user?.role === "admin" && (
    //         <a href="/admin">
    //           <button className="hidden sm:inline px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm cursor-pointer">
    //             Admin
    //           </button>
    //         </a>
    //       )}
    //      {user&& <div>
    //         <button
    //           className="hidden sm:inline px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm cursor-pointer"
    //           onClick={() => logout()}
    //         >
    //           {loading ? "logOut....." : "logOut"}
    //         </button>
    //       </div>}
    //     </div>
    //   </div>
    // </header>
      <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* 🔹 Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
            TW
          </div>
          <a href="/" className="text-xl font-semibold text-gray-800">
            TrendWise
          </a>
        </div>

        {/* 🔹 Desktop Nav */}
      

        {/* 🔹 User Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          {user?.role === "user" && (
            <a href={`/comment/history/${user?._id}`}>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
                Comment History
              </button>
            </a>
          )}

          {user?.role === "admin" && (
            <a href="/admin">
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
                Admin
              </button>
            </a>
          )}

          {user && (
            <button
              onClick={() => logout()}
              className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>

        {/* 🔹 Mobile Hamburger */}
        <button
          className="sm:hidden flex items-center text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col space-y-2 py-3 px-4">
      
            {user?.role === "user" && (
              <a
                href={`/comment/history/${user?._id}`}
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Comment History
              </a>
            )}

            {user?.role === "admin" && (
              <a href="/admin" className="text-sm text-gray-700 hover:text-blue-600">
                Admin
              </a>
            )}

            {user && (
              <button
                onClick={() => logout()}
                className="mt-2 px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
