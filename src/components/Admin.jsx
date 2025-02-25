import React, { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/chasam.png";
import Adminbg from "../assets/adminbg.jpeg";
import AdminNav from "./AdminNav";

const Admin = ({  }) => {
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
  return (
    <div className="flex h-screen " onClick={closeMenu}>
     
      {/* Sidebar Navigation */}
      <div
        className={`sidebar fixed top-0 left-0 h-full z-[998] bg-[#00000007] backdrop-blur-sm shadow-lg w-14 transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminNav closeMenu={() => setMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center w-full">
        {/* Top Navigation */}
        <div className="flex items-center bg-[#00000000]  py-4 px-0 z-[999] fixed top-0 w-full">
          <button
            className="menu-btn text-gray-700 text-2xl p-4 focus:outline-none ml-0"
            onClick={toggleMenu}
          >
            <FaEllipsisV className="text-white text-3xl"/>
          </button>
          <div className="ml-[-5px] flex justify-center">
            <img src={logo} alt="Logo" className="w-14" />
          </div>
          {/* <h1 className="text-xl font-bold text-gray-700 ml-[25px]">
            Dashboard
          </h1> */}
          <div
            className="flex justify-center ml-55 text-2xl"
            onClick={handleLogout}
          >
            <IoMdLogOut className="text-white text-3xl"/>
          </div>
        </div>
      </div>


      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center h-full -z-20">
        <div className="h-full w-full object-cover opacity-90">
          <img src={Adminbg} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
