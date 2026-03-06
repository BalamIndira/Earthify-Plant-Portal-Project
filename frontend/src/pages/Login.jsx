import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Email: letters/numbers, only @ and ., ends with @gmail.com
const validateEmail = (email) =>
  /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@gmail\.com$/.test(email);
// Password: letters + numbers only, min 2 chars
const validatePassword = (pass) => /^[a-zA-Z0-9]{2,}$/.test(pass);

export default function Login() {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUsers, setHasUsers] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const nav = useNavigate();

  // Check if any users exist
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setHasUsers(users.length > 0);
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    // Allow letters, numbers, @, . only
    if (/^[a-zA-Z0-9@.]*$/.test(value) || value === "") setEmail(value);
  };

  const handlePassChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) setPass(value);
  };

  const handleNotLoggedInClick = () => {
    nav("/register"); // go to register page
  };

  const API =
    import.meta.env.VITE_API_URL ||
    `http://localhost:${import.meta.env.VITE_API_PORT || 4000}/api`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Enter a valid Gmail address ending with @gmail.com");
      return;
    }
    if (!validatePassword(pass)) {
      setError("Password must be letters/numbers, min 2 chars");
      return;
    }

    // Quick local check: if email not registered locally redirect to Register
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const localMatch = storedUsers.find((u) => u.email === email);
    if (!localMatch) {
      // not registered locally -> redirect to register page
      nav("/register");
      return;
    }

    setLoading(true);
    try {
      // Try backend login first
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        const safeUser = { ...data.user };
        if (safeUser.password) delete safeUser.password;
        localStorage.setItem("currentUser", JSON.stringify(safeUser));

        switch (data.user.role) {
          case "seller":
            nav("/seller");
            break;
          case "delivery":
            nav("/delivery");
            break;
          case "admin":
            nav("/admin");
            break;
          default:
            nav("/buyer");
        }
        return;
      }

      // If backend responded but not ok, fall back to local auth
      setError(data.message || "Login failed on server, trying local auth...");
    } catch (err) {
      // network error -> fallback to local auth
    }

    // Local fallback authentication using localStorage users
    try {
      const stored = JSON.parse(localStorage.getItem("users") || "[]");
      const user = stored.find((u) => u.email === email && u.password === pass);
      if (user) {
        // emulate token
        const token = "local-token-" + Date.now();
        localStorage.setItem("token", token);
        const safe = { ...user };
        if (safe.password) delete safe.password;
        // ensure role exists
        safe.role = safe.role || "buyer";
        localStorage.setItem("currentUser", JSON.stringify(safe));

        // navigate based on role (local)
        switch (safe.role) {
          case "seller":
            nav("/seller");
            break;
          case "delivery":
            nav("/delivery");
            break;
          case "admin":
            nav("/admin");
            break;
          default:
            nav("/buyer");
        }
      } else {
        setError(
          "Invalid credentials. If you haven't registered, please register first."
        );
      }
    } catch (e) {
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://tse3.mm.bing.net/th/id/OIP.H6aALWNDdtfPwVt4z3yGmAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3')",
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[360px] bg-white/85 border border-green-400 rounded-2xl p-8 shadow-2xl backdrop-blur-md"
      >
        <h3 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Login
        </h3>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-lg text-center font-semibold border border-red-300">
            ⚠ {error}
          </div>
        )}

        <label className="text-green-800 font-semibold mb-1 block">Email</label>
        <input
          value={email}
          onChange={handleEmailChange}
          placeholder="letters+numbers@gmail.com"
          className="w-full p-3 mb-4 rounded-lg border border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />

        <label className="text-green-800 font-semibold mb-1 block">
          Password
        </label>
        <div className="relative mb-6">
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

        {!hasUsers ? (
          <button
            type="button"
            onClick={handleNotLoggedInClick}
            className="w-full py-2 font-bold text-white rounded-full bg-green-700 hover:bg-green-800 transition duration-300"
          >
            Not Logged In? Register
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-700 to-lime-600 hover:from-green-800 hover:to-lime-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        )}

        <p className="mt-5 text-center text-sm text-green-700 cursor-pointer hover:underline">
          Don’t have an account?{" "}
          <span
            onClick={() => nav("/register")}
            className="text-green-700 font-semibold hover:underline"
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}
