import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Validations
const validateEmail = (email) => /^[a-zA-Z]+[0-9]*@gmail\.com$/.test(email);
const validatePassword = (pass) => /^[a-zA-Z0-9]+$/.test(pass);
const validateName = (name) => /^[A-Za-z\s]+$/.test(name);

export default function Register() {
  const { register } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const nav = useNavigate();

  // Full Name input restrict
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) setName(value);
  };

  // Email input restrict
  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z][a-zA-Z0-9@.]*$/.test(value) || value === "") setEmail(value);
  };

  // Password input restrict
  const handlePassChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) setPass(value);
  };

  // Phone input restrict (max 10 digits)
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) setPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !pass || !address) {
      setError("All required fields must be filled.");
      return;
    }

    if (!validateName(name)) {
      setError("Full Name must contain letters only.");
      return;
    }

    if (!validateEmail(email)) {
      setError(
        "Email must start with letters, optional numbers, and end with @gmail.com"
      );
      return;
    }

    if (!validatePassword(pass)) {
      setError("Password must contain only letters and numbers (no symbols).");
      return;
    }

    if (phone && phone.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = storedUsers.find((u) => u.email === email);

      if (existingUser) {
        alert("User already registered! Redirecting to login...");
        nav("/login");
        setLoading(false);
        return;
      }

      const newUser = {
        name,
        email,
        password: pass,
        address,
        phone,
        role: "buyer",
      };
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      // do not auto-login — navigate to login page per requirement
      if (register) register(newUser);

      alert("✅ Registration successful! Redirecting to Login...");
      setTimeout(() => nav("/login"), 700);
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://tse4.mm.bing.net/th/id/OIP.AErHD1YPqJaJzFn0KZB9igHaD2?cb=12&w=3840&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3')",
      }}
    >
      <div className="absolute inset-0 bg-green-900/30 backdrop-blur-sm"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/85 p-8 rounded-2xl shadow-lg w-[90%] max-w-md z-10 border border-green-400 backdrop-blur-md"
      >
        <h3 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🌿 Register with Earthify
        </h3>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">⚠ {error}</div>
        )}

        {/* Full Name */}
        <label className="block mb-1 text-green-800 font-medium">
          Full Name *
        </label>
        <input
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your full name"
          className="w-full p-3 mb-3 rounded-lg border border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />

        {/* Email */}
        <label className="block mb-1 text-green-800 font-medium">Email *</label>
        <input
          value={email}
          onChange={handleEmailChange}
          placeholder="example@gmail.com"
          className="w-full p-3 mb-3 rounded-lg border border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />

        {/* Password */}
        <label className="block mb-1 text-green-800 font-medium">
          Password *
        </label>
        <div className="relative mb-3">
          <input
            value={pass}
            onChange={handlePassChange}
            type={showPass ? "text" : "password"}
            placeholder="Letters and numbers only"
            className="w-full p-3 rounded-lg border border-green-400 focus:ring-2 focus:ring-green-500 outline-none pr-10"
            required
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-green-700"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </div>
        </div>

        {/* Address */}
        <label className="block mb-1 text-green-800 font-medium">
          Address *
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="w-full p-3 mb-3 rounded-lg border border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />

        {/* Phone */}
        <label className="block mb-1 text-green-800 font-medium">
          Phone Number (Optional)
        </label>
        <input
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Enter your phone number"
          type="tel"
          className="w-full p-3 mb-5 rounded-lg border border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
            loading
              ? "bg-green-700/70 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 hover:scale-[1.03]"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm mt-4 text-gray-700 text-center cursor-pointer hover:underline">
          Already have an account?{" "}
          <span
            onClick={() => nav("/login")}
            className="text-sm text-green-700 hover:underline"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
