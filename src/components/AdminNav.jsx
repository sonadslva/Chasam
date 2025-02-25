import React from "react";
import { FaHome, FaImage, FaBox, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNav = ({  }) => {
  const navigate = useNavigate();

  // Navigate & Close Menu on Click
  const handleNavigation = (path) => {
    navigate(path);
     // Close the menu automatically
  };

  return (
    <nav className="flex flex-col items-center justify-center space-y-6  mt-[-100px] h-full">
      <button
        className="p-3 pt-0 rounded-lg hover:bg-green-100"
        onClick={() => handleNavigation("/admin")}
      >
        <FaHome className="text-white text-2xl" />
      </button>
      <button
        className="p-3 rounded-lg hover:bg-green-100"
        onClick={() => handleNavigation("/imagebanner")}
      >
        <FaImage className="text-white text-2xl" />
      </button>
      <button className="p-3 rounded-lg hover:bg-green-100"
      onClick={() => handleNavigation("/product")}
       >
        <FaBox className="text-white text-2xl" />
      </button>
      <button className="p-3 rounded-lg hover:bg-green-100" 
      onClick={() => handleNavigation("/category")}>
        <FaList className="text-white text-2xl" />
      </button>
    </nav>
  );
};

export default AdminNav;
