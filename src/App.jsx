import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Navbar />

      {/*  ADD THIS */}
      <Toaster position="top-center" reverseOrder={false} />

      <Outlet />
      <Footer />
    </>
  );
}