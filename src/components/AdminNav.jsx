import React from "react";
import { FaHome, FaImage, FaBox, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  // Navigate & Close Menu on Click
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="md:fixed pt-24 md:pt-0  left-0 h-full w-14 md:w-64 md:bg-[#00000062] text-white flex flex-col items-center md:items-start py-8 space-y-6">
      {/* Home */}
      <button
        className="flex items-center gap-4 p-3 rounded-lg hover:text-yellow-200 w-full md:pt-32"
        onClick={() => handleNavigation("/admin")}
      >
        <FaHome className="text-2xl " />
        <span className="hidden md:inline-block text-lg font-medium ">Home</span>
      </button>

      {/* Image Banner */}
      <button
        className="flex items-center gap-4 p-3 rounded-lg hover:text-yellow-200 w-full"
        onClick={() => handleNavigation("/imagebanner")}
      >
        <FaImage className="text-2xl" />
        <span className="hidden md:inline-block text-lg font-medium">Banners</span>
      </button>

      {/* Products */}
      <button
        className="flex items-center gap-4 p-3 rounded-lg hover:text-yellow-200 w-full"
        onClick={() => handleNavigation("/product")}
      >
        <FaBox className="text-2xl" />
        <span className="hidden md:inline-block text-lg font-medium">Products</span>
      </button>

      {/* Categories */}
      <button
        className="flex items-center gap-4 p-3 rounded-lg hover:text-yellow-200 w-full"
        onClick={() => handleNavigation("/category")}
      >
        <FaList className="text-2xl" />
        <span className="hidden md:inline-block text-lg font-medium">Categories</span>
      </button>
    </nav>
  );
};

export default AdminNav;
