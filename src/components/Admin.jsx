import React, { useState, useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/chasam.png";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import AdminNav from "./AdminNav";
import Adminbg from "../assets/adminbg.jpeg"; // Import background image

const Admin = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div
      className="flex h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Adminbg})` }} // Set background
    >
      {/* Sidebar - Hidden in Mobile by Default */}
      <div
        className={`sidebar fixed top-0 left-0 h-full z-[999] bg-[#00000007] backdrop-blur-sm shadow-lg md:w-64 w-14 transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <AdminNav closeMenu={() => setMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full ml-0 md:ml-64">
        {/* Top Navigation */}
        <div className="flex items-center py-4 px-0 z-[999] sticky top-0 w-full md:bg-white md:shadow-md rounded-b-3xl">
          {/* Toggle Sidebar on Mobile */}
          <button
            className="text-white text-2xl p-4 focus:outline-none ml-0 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaEllipsisV className="text-3xl" />
          </button>

          {/* Logo */}
          <div className="ml-[-5px] flex justify-center">
            <img src={logo} alt="Logo" className="w-14" />
          </div>

          {/* Logout Button */}
          <div
            className="flex justify-center ml-auto pr-3 text-2xl cursor-pointer"
            onClick={handleLogout}
          >
            <IoMdLogOut className="text-3xl md:text-black text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center w-full mt-5 px-4">
          <div className="max-w-4xl text-center bg-black/20 backdrop-blur-sm p-5 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              🌿 Nature’s <span className="block">Wellness Hub!</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white font-medium">
              Chasam Ayurvedic & Spice Garden Shop offers pure Ayurvedic
              products, exotic spices, and natural remedies sourced from nature.
            </p>
            <p className="mt-2 text-lg md:text-xl text-white font-medium">
              Discover healing herbs, aromatic spices, and Ayurvedic beauty
              essentials – all sustainably sourced for your well-being. Step
              into Chasam and embrace the power of nature! 🌱✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
