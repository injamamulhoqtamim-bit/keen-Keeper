import { FaUserPlus } from "react-icons/fa";

export default function Banner() {
  return (
    <div className="bg-gray-100 pt-24 sm:pt-28 pb-12 sm:pb-16 text-center px-4">

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
        Friends to keep close in your life
      </h1>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-gray-500 max-w-md sm:max-w-xl mx-auto mb-5 sm:mb-6 leading-relaxed">
        Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
      </p>

      {/* Button */}
      <button className="inline-flex items-center gap-2 bg-[#1f4d3a] hover:bg-[#17382c] text-white px-4 sm:px-5 py-2 rounded-md text-xs sm:text-sm transition">
        <FaUserPlus className="text-xs sm:text-sm" />
        Add a Friend
      </button>

      {/* Divider */}
      <div className="max-w-6xl mx-auto mt-10 sm:mt-12 border-t border-gray-300"></div>

    </div>
  );
}