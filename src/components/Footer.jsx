import { FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#255946] text-white mt-16">
      
      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          KeenKeeper
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-xs text-gray-200 max-w-md sm:max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <h3 className="text-sm sm:text-sm mb-3 sm:mb-4">
          Social Links
        </h3>

        <div className="flex justify-center gap-3 sm:gap-4">
          <div className="bg-white text-black p-2 sm:p-3 rounded-full cursor-pointer hover:scale-110 transition">
            <FaYoutube size={14} className="sm:w-4 sm:h-4" />
          </div>
          <div className="bg-white text-black p-2 sm:p-3 rounded-full cursor-pointer hover:scale-110 transition">
            <FaFacebookF size={14} className="sm:w-4 sm:h-4" />
          </div>
          <div className="bg-white text-black p-2 sm:p-3 rounded-full cursor-pointer hover:scale-110 transition">
            <FaXTwitter size={14} className="sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs text-gray-200 gap-2">
          
          <p className="text-center md:text-left">
            © 2026 KeenKeeper. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            <span className="cursor-pointer hover:underline">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:underline">
              Terms of Service
            </span>
            <span className="cursor-pointer hover:underline">
              Cookies
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}