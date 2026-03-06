import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const handleGoogleLogin = (response) => {
    console.log("Google login response:", response);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-700">Login</h2>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google login failed")}
          useOneTap
        />
      </div>
    </div>
  );
};

export default LoginPage;
