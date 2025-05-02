import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username?: string; profilePicture?: string }>({
    username: "User",
    profilePicture: "",
  });

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-2 flex justify-between items-center fixed top-0 w-full z-10 h-14">
      {/* Left - Logo */}
      <h4
        className="text-lg font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition"
        onClick={() => navigate("/")}
      >
        Medical Captioning
      </h4>

      {/* Right - Profile & Logout */}
      <div className="relative flex items-center space-x-4">
        {/* Profile Avatar + Username */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center space-x-3 hover:scale-105 transition-transform"
        >
          <img
            src={user.profilePicture || "https://i.pinimg.com/originals/2b/7d/07/2b7d07b5eb5e44de0738eb924c2f02af.jpg"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-blue-500 hover:border-blue-700 transition"
          />
          <span className="font-medium text-gray-700">{user.username || "Guest"}</span>
        </button>

        {/* Logout Button */}
        <button
          className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 hover:scale-105 transition-all shadow-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default ProfileDashboard;
