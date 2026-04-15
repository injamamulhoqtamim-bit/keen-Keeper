import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar always top */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer always bottom */}
      <Footer />

    </div>
  );
}