import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaClock, FaChartLine, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#f3f4f6] border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">

        {/* 🔥 LOGO FIXED */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          <span className="text-gray-800">Keen</span>
          <span className="text-[#1f4d3a]">Keeper</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 bg-[#1f4d3a] text-white px-4 py-2 rounded-md text-sm"
                : "flex items-center gap-2 text-gray-600 text-sm hover:text-black"
            }
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/timeline"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 bg-[#1f4d3a] text-white px-4 py-2 rounded-md text-sm"
                : "flex items-center gap-2 text-gray-600 text-sm hover:text-black"
            }
          >
            <FaClock /> Timeline
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 bg-[#1f4d3a] text-white px-4 py-2 rounded-md text-sm"
                : "flex items-center gap-2 text-gray-600 text-sm hover:text-black"
            }
          >
            <FaChartLine /> Stats
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-xl text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-4 sm:px-6 pb-4 bg-[#f3f4f6]">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 text-sm"
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/timeline"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 text-sm"
          >
            <FaClock /> Timeline
          </NavLink>

          <NavLink
            to="/stats"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 text-sm"
          >
            <FaChartLine /> Stats
          </NavLink>

        </div>
      )}
    </nav>
  );
}