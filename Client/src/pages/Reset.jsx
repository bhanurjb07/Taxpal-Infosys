
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
const pwRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export default function Reset() {
  const location = useLocation();
  const nav = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPass, setShowPass] = useState(false); 
  async function onSubmit(e) {
    e.preventDefault();
    if (pw1 !== pw2) return toast.error("Passwords do not match");
    if (!pwRegex.test(pw1))
      return toast.error(
        "Password needs 1 uppercase, 1 number, 1 special, min 8 chars"
      );

    try {
      const res = await fetch("http://localhost:5001/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password: pw1 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");

      toast.success("Password changed successfully, please login");
      setTimeout(() => nav("/"), 900);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-20">
  <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
    <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
        <p className="text-gray-600 text-center mt-1 mb-6">
          Enter your OTP and set a new password
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm mb-1">OTP</label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm mb-1">New Password</label>
            <input
              type={showPass ? "text" : "password"}
              required
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* ew Password */}
          <div className="relative">
            <label className="block text-sm mb-1">Confirm New Password</label>
            <input
              type={showPass ? "text" : "password"}
              required
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Change Password
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          <Link to="/forgot" className="text-blue-600 hover:underline">
            Back
          </Link>
        </p>
      </div>
    </div>
  );
}
