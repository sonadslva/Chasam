import React, { useState, useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/chasam.png";
import Adminbg from "../assets/adminbg.jpeg";
import AdminNav from "./AdminNav";

const Admin = ({}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click from immediately closing menu
    setMenuOpen((prev) => !prev);
  };

  // Close the menu when clicking outside
  const closeMenu = (e) => {
    if (!e.target.closest(".sidebar") && !e.target.closest(".menu-btn")) {
      setMenuOpen(false);
    }
  };
  
  const handleLogout = () => {
    // Perform logout logic here (e.g., Firebase sign-out)
    navigate("/login"); // Redirect to login after logout
  };
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="flex h-screen relative overflow-hidden" onClick={closeMenu}>
      {/* Sidebar Navigation */}
      <div
        className={`sidebar fixed top-0 left-0 h-full z-[998] bg-[#00000007] backdrop-blur-sm shadow-lg w-14 transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminNav closeMenu={() => setMenuOpen(false)} />
      </div>

      {/* Background Image - Now as a fixed background that covers the entire page */}
      <div className="fixed inset-0 w-full h-full -z-20">
        <img
          src={Adminbg}
          alt="Background"
          className="h-full w-full object-cover opacity-90"
        />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col w-full pb-10">
        {/* Top Navigation */}
        <div
          className={`flex items-center py-4 px-0 z-[999] sticky top-0 w-full transition-colors duration-300 ${
            isScrolled ? "bg-white shadow-md rounded-b-3xl" : "bg-transparent"
          }`}
        >
          <button
            className="menu-btn text-gray-700 text-2xl p-4 focus:outline-none ml-0"
            onClick={toggleMenu}
          >
            <FaEllipsisV
              className={`text-3xl ${isScrolled ? "text-black" : "text-white"}`}
            />
          </button>
          <div className="ml-[-5px] flex justify-center">
            <img src={logo} alt="Logo" className="w-14" />
          </div>
          <div
            className="flex justify-center ml-auto pr-3 text-2xl"
            onClick={handleLogout}
          >
            <IoMdLogOut
              className={`text-3xl ${isScrolled ? "text-black" : "text-white"}`}
            />
          </div>
        </div>

        {/* Business Description - Now in a scrollable container */}
        <div className="flex flex-col items-center justify-center w-full mt-5 px-4">
          <div className="max-w-4xl text-center bg-black/20 backdrop-blur-sm p-5 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
             🌿 Nature’s 🌿<span className="block">Wellness Hub!</span> 
              
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white font-medium">
              Chasam Ayurvedic & Spice Garden Shop offers pure Ayurvedic
              products, exotic spices, and natural remedies sourced from nature.
              We provide herbal supplements, organic spices, essential oils, and
              handcrafted wellness products to support a healthy lifestyle.
            </p>
            <p className="mt-2 text-lg md:text-xl text-white font-medium">
              Discover healing herbs, aromatic spices, and Ayurvedic beauty
              essentials – all sustainably sourced for your well-being. Step
              into Chasam and embrace the power of nature! 🌱✨
            </p>
          </div>

          {/* Additional content can be added here */}
          <div className="mt-10 max-w-4xl w-full">
            {/* Your additional content would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;