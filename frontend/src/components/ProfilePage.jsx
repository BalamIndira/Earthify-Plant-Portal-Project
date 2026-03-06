// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const navigate = useNavigate();

  // Load logged user details
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedUser) {
      setUser(loggedUser);
      setForm({
        name: loggedUser.name || "",
        email: loggedUser.email || "",
        phone: loggedUser.phone || "",
        address: loggedUser.address || "",
        city: loggedUser.city || "",
        state: loggedUser.state || "",
        zip: loggedUser.zip || "",
      });
    } else {
      alert("⚠️ No user logged in! Please login first.");
      navigate("/login");
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "zip") {
      if (/^\d*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Save updates to localStorage
  const handleUpdate = () => {
    const updatedUser = { ...user, ...form };
    setUser(updatedUser);

    // Update currentUser
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Update registeredUsers list
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const index = allUsers.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      allUsers[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(allUsers));
    }

    setEditingField("");
    alert("✅ Profile updated successfully!");
  };

  // Double click to edit field
  const handleDoubleClick = (field) => setEditingField(field);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // remove only loggedUser
    alert("🚪 Logged out successfully!");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 text-gray-700">
        Loading user profile...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6 flex flex-col items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
        🌿 My Profile
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border-2 border-green-200 backdrop-blur-sm">
        {["name", "email", "phone", "address", "city", "state", "zip"].map(
          (field) => (
            <div className="mb-4" key={field}>
              <label className="block text-green-800 font-semibold capitalize">
                {field}:
              </label>
              {editingField === field && field !== "email" ? (
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  onBlur={handleUpdate}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                  autoFocus
                  placeholder={
                    field === "phone" || field === "zip"
                      ? "Numbers only"
                      : `Enter your ${field}`
                  }
                />
              ) : (
                <p
                  className={`text-green-700 p-2 bg-green-50 rounded-lg hover:bg-green-100 ${
                    field === "email" ? "cursor-default" : "cursor-pointer"
                  }`}
                  onDoubleClick={() =>
                    field !== "email" && handleDoubleClick(field)
                  }
                >
                  {form[field] || "Not added"}
                </p>
              )}
            </div>
          )
        )}

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold w-full sm:w-auto"
          >
            Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
