import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

export default function MiddleBar() {
  const [query, setQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  return (
    <div
      style={{
        // background: "#3fb36a",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
        <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
          Earthify
        </NavLink>
      </div> */}

      <form
        onSubmit={handleSearch}
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          margin: "0 40px",
          // border:"2px solid lightgreen"
        }}
      >
        <input
          type="text"
          placeholder="Search plants..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "60%",
            padding: "8px 12px",
            borderRadius: "10px 0px 0px 10px",
            border: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "0px 10px 10px 0px",
          }}
        >
          Search
        </button>
      </form>

      {/* <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <NavLink to="/cart">
          <IoMdCart size={22} />
        </NavLink>
        <NavLink to="/wishlist">
          <FaHeart size={20} />
        </NavLink>

        {user ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "darkgreen",
              color: "white",
              padding: "6px 14px",
              borderRadius: "20px",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setShowDetails((prev) => !prev)}
          >
            <FaUserCircle />
            <span>{user.name}</span>

            {showDetails && (
              <div
                style={{
                  position: "absolute",
                  top: "35px",
                  right: 0,
                  background: "white",
                  color: "black",
                  padding: "1px 0px 0px 0px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                <p style={{ margin: "10px 0px 13px 0px", textAlign: "center" }}>
                  <strong>Email:</strong> {user.name}
                </p>

                <button
                  onClick={logout}
                  style={{
                    margin: "-18px 0px 8px 80px",
                    background: "red",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    // alignContent: "center",
                    // justifyItems: "center",
                    // alignItems: "center",
                    // justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <span
            style={{
              padding: "6px 14px",
              background: "gray",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Not Logged In
          </span>
        )}
      </div> */}
    </div>
  );
}
