import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { API } from "../api";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      //  Save token
      localStorage.setItem("token", data.token);

      //  Save email
      localStorage.setItem("email", email);

      //  Save name 
      if (data.name) {
        localStorage.setItem("name", data.name);
      } else {
        const fallbackName = email.split("@")[0];
        localStorage.setItem("name", fallbackName);
      }

      setIsAuthenticated(true);

      toast.success("Successfully logged in");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-semibold text-center mb-2">Sign In</h1>
        <p className="text-center text-gray-500 mb-6">
          Access your TaxPal account
        </p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="input w-full border rounded-md px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="input w-full border rounded-md px-3 py-2 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end text-sm">
            <Link to="/forgot" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            className="btn w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            type="submit"
          >
            Sign in
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </main>
  );
}
