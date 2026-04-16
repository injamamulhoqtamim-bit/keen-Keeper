import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white-100 px-4 text-center">

      {/* 404 */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 mb-4">
        404
      </h1>

      {/* MESSAGE */}
      <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md">
        Looks like this friendship link is broken. The page you're looking for
        doesn't exist or has been moved.
      </p>

      {/* BUTTON */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-[#1f4d3a] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-[#173c2d] transition shadow-sm"
      >
        <FaHome className="text-sm sm:text-base" />
         Back to Home
      </Link>

    </div>
  );
}