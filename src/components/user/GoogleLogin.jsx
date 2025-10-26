import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";
import { googleAuth } from "../../api/api";
import googleImage from "../../assets/googleImage.png";
import { useUser } from "../../userContext";
const GoogleLogin = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUser();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);

        const { name, eamil, token, userId } = result.data;
        const obj = { name, eamil, token, userId };
        localStorage.setItem("user-info", JSON.stringify(obj));
        await fetchUser();
        navigate("/role");
        console.log("result.data.user.......", result.data);
      }
    } catch (error) {
      console.log("Erro while requesting google code:", error);
    }
  };
  // const googleLogin = useGoogleLogin({
  //   onSuccess: responseGoogle,
  //   onError: responseGoogle,
  //   flow: "auth-code",
  // });
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
    redirect_uri:import.meta.env.VITE_BACKEND_URL || "https://trendwise-frontend-cdoi.onrender.com",
  });
  return (
    <div className="h-50 flex items-center justify-center ">
      <button
        onClick={googleLogin}
        className="flex items-center gap-3 bg-white shadow-md hover:shadow-lg transition p-3 rounded-lg text-gray-800 font-semibold hover:bg-gray-50"
      >
        <img src={googleImage} alt="Google Logo" className="w-6 h-6" />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
