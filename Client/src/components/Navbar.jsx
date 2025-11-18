import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const email = localStorage.getItem("email") || "guest@example.com";
  const username = email.split("@")[0];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  useEffect(() => {
    const onDoc = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleHamburgerClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <button
              onClick={handleHamburgerClick}
              className="p-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Toggle sidebar"
            >
              <HiMenu size={28} />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white">🧮</span>
            <span className="text-lg font-semibold">TaxPal</span>
          </Link>
        </div>

        {/* isible only when not log in) */}
        {!isLoggedIn && (
          <nav className="flex gap-6 text-gray-700 font-medium">
            <Link to="/features" className="hover:text-blue-600">Features</Link>
            <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
            <Link to="/support" className="hover:text-blue-600">Support</Link>
          </nav>
        )}

        {/* Logged-in Usr */}
        {isLoggedIn && (
          <div ref={dropdownRef} className="relative flex items-center gap-3 cursor-pointer p-1 rounded-lg">
            <span className="text-gray-700 font-medium hidden sm:inline">Hi, {username}</span>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center h-10 w-10 rounded-full border hover:ring-2 hover:ring-blue-400 transition text-gray-600 p-1"
              aria-label="Open profile menu"
            >
              <FaUserCircle size={26} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
