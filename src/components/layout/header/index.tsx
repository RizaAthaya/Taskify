import { useState } from "react";
import { useUser } from "@/context/user/useUser";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user?.displayName
    ? user.displayName
        .trim()
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-5 md:px-10 py-4">
      {/* Brand */}
      <h1
        onClick={() => navigate("/tasks")}
        className="text-3xl font-extrabold text-purple-600 select-none italic flex items-center gap-1 cursor-pointer"
      >
        Taskify
        <Icon icon="ph:sparkle-fill" className="w-7 h-7 text-purple-500" />
      </h1>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-3 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-full focus:outline-none transition cursor-pointer"
        >
          {/* Circle with initial */}
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-semibold shadow">
            {initials}
          </div>

          {/* Display Name */}
          <span className="text-gray-700 font-medium">{user?.displayName?.split(" ")[0]}</span>

          {/* Dropdown Icon */}
          <Icon
            icon="mdi:chevron-down"
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              menuOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-2xl py-2 z-10 border border-gray-200">
            {/* USER INFO */}
            <div className="px-3 py-1.5 flex gap-3 items-center">
              <Icon icon="mdi:account-circle" className="w-10 h-10 text-purple-500" />
              <div className="flex flex-col leading-tight">
                <p className="text-sm font-semibold text-gray-800">{user?.displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition font-medium flex items-center gap-2"
            >
              <Icon icon="mdi:logout" className="w-4 h-4 text-red-600" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
