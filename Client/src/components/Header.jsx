import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Header({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);


  const [displayName, setDisplayName] = useState("User");


  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

 
  useEffect(() => {
    const updateProfile = () => {
      const saved = JSON.parse(localStorage.getItem("profileSettings"));
      if (saved?.name) {
        setDisplayName(saved.name);
      } else if (saved?.email) {
        setDisplayName(saved.email.split("@")[0]);
      } else {
        setDisplayName("User");
      }
    };

    updateProfile(); 
    window.addEventListener("profile-updated", updateProfile);

    return () => window.removeEventListener("profile-updated", updateProfile);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="flex items-center justify-between px-6 py-3">
          
          <Link to="/dashboard" className="flex items-center gap-2">
            
            <span className="text-xl font-bold text-gray-800">TaxPal</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <nav className="flex items-center gap-6 text-gray-700">
                <Link to="/features" className="hover:text-blue-600">
                  Features
                </Link>
                <Link to="/pricing" className="hover:text-blue-600">
                  Pricing
                </Link>
                <Link to="/support" className="hover:text-blue-600">
                  Support
                </Link>
              </nav>
            ) : (
              <div
                className="relative flex items-center gap-3"
                ref={dropdownRef}
              >
                <span className="font-medium text-gray-700 hidden sm:block">
                  Hi, {displayName}
                </span>
                <button
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      displayName
                    )}&background=0D8ABC&color=fff`}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    {/* Settings */}
                    <button
                      onClick={() => navigate("/category")} // navigate to settings page
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgp53HKq4fyclYtZdD-0wHVV2YC2rZ0tmGg&s"
                        alt="settings"
                        className="w-4 h-4"
                      />
                      Settings
                    </button>

                    {/* Logout */}
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/4400/4400629.png"
                        alt="logout"
                        className="w-4 h-4"
                      />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/*  Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-100 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout(); // Call logout function
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
