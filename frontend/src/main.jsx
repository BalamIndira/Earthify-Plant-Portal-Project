import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ProductProvider>
      <AuthProvider>
        <GoogleOAuthProvider>
        <App />
        </GoogleOAuthProvider>
      </AuthProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);
