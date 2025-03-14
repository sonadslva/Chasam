import React, { useState, useEffect } from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { dbRealtime } from "../firebaseConfig";
import logo from "../assets/chasam.png";
import { IoMdLogOut } from "react-icons/io";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { BiSolidFileImage } from "react-icons/bi";
import categoryBg from "../assets/imgbg.jpeg";
import catbg1 from "../assets/catbg1.jpg";
import catbg2 from "../assets/catbg2.jpg";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import imgbgb from '../assets/imgbg.jpeg';

const Category = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Update based on auth state
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const categoriesRef = ref(dbRealtime, "categories");
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoriesArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setCategories(categoriesArray);
      } else {
        setCategories([]);
      }
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false); // Explicitly update state
        navigate("/login"); // Redirect to login
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setSelectedFile(null);
    setCategoryName("");
    setIsEditing(false);
    setCurrentCategoryId(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !categoryName) {
      alert("Please enter category name and select an image!");
      return;
    }

    const categoryData = {
      image: selectedFile,
      name: categoryName,
      date: new Date().toLocaleString(),
    };

    try {
      if (isEditing && currentCategoryId) {
        // Update existing category
        const categoryRef = ref(dbRealtime, `categories/${currentCategoryId}`);
        await update(categoryRef, categoryData);
        alert("Category updated successfully!");
      } else {
        // Add new category
        const categoriesRef = ref(dbRealtime, "categories");
        await push(categoriesRef, categoryData);
        alert("Category added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category.");
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentCategoryId(category.id);
    setCategoryName(category.name);
    setSelectedFile(category.image);
    setShowForm(true);
    setShowCategories(false);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const categoryRef = ref(dbRealtime, `categories/${categoryId}`);
        await remove(categoryRef);
        alert("Category deleted successfully!");
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category.");
      }
    }
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

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && window.innerWidth < 768) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className="flex min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${categoryBg})` }}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-[999] bg-[#00000007] backdrop-blur-sm shadow-lg md:w-64 w-14 transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <AdminNav closeMenu={() => setMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col ml-0 md:ml-64 transition-all">

        {/* Top Navbar */}
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

        {/* Page Content - fixed container for mobile */}
        <div className="relative flex-1 px-4 pb-4 pt-16 md:pt-20 overflow-x-hidden">
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            

            {/* Category Action Buttons - fixed for mobile */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center pt-5">
                MANAGE BANNERS
              </h2>

              <div className="flex gap-2 w-full">
                <div
                  className="relative w-[50%] h-[180px] flex justify-center items-center rounded-3xl bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${catbg1})` }}
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                    setShowCategories(false);
                  }}
                >
                  <div className="bg-black absolute inset-0 w-full h-full opacity-30 rounded-3xl"></div>
                  <button className="text-white relative px-6 py-3 text-xl md:text-2xl font-black">
                    ADD CATEGORY
                  </button>
                </div>

                {/* VIEW CATEGORIES BUTTON */}
                <div
                  className="relative w-[50%] h-[180px] flex justify-center items-center rounded-3xl bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${catbg2})` }}
                  onClick={() => {
                    setShowCategories((prev) => !prev);
                    setShowForm(false);
                  }}
                >
                  <div className="bg-black absolute inset-0 w-full h-full opacity-30 rounded-3xl"></div>
                  <button className="text-white relative px-6 py-3 text-xl md:text-2xl font-black">
                    VIEW CATEGORIES
                  </button>
                </div>
              </div>

              {/* ADD/EDIT CATEGORY FORM - improved responsiveness */}
              {showForm && (
                <div className="w-full max-w-md mx-auto bg-[#CBBA9E] p-6 mt-6 rounded-lg shadow-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
                    {isEditing ? "EDIT CATEGORY" : "ADD NEW CATEGORY"}
                  </h3>
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="w-full border border-[#51372A] bg-white p-2 rounded-lg focus:outline-none"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <div className="mt-2 relative border rounded-lg p-2 bg-white">
                    <input
                      type="file"
                      id="categoryImage"
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <div className="flex items-center justify-center">
                      <BiSolidFileImage className="text-gray-500 mr-2" />
                      <span className="text-gray-500">
                        {selectedFile ? "Change Image" : "Select Image"}
                      </span>
                    </div>
                  </div>
                  {selectedFile && (
                    <div className="mt-2">
                      <p className="text-white text-sm mb-1">Image Preview:</p>
                      <img
                        src={selectedFile}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2 w-full">
                    <button
                      className="px-4 py-2 bg-[#8B6254] text-white rounded-lg w-full mb-2 sm:mb-0"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-[#435933] hover:bg-[#304421] text-white rounded-lg w-full"
                      onClick={handleSubmit}
                    >
                      {isEditing ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW CATEGORIES SECTION - improved grid for mobile */}
              {showCategories && (
                <div className="mt-8 w-full relative bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-black mb-4 text-center">
                    UPLOADED CATEGORIES
                  </h3>
                  {categories.length === 0 ? (
                    <p className="text-black text-center">
                      No categories uploaded yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="shadow-lg bg-[#ab8c59] rounded-lg overflow-hidden"
                        >
                          <img
                            src={category.image}
                            alt="Category"
                            className="w-full h-40 object-cover"
                          />
                          <p className="text-black text-center mt-2 font-bold px-2 truncate">
                            {category.name}
                          </p>
                          <div className="p-3 flex justify-between items-center">
                            <button
                              onClick={() => handleEdit(category)}
                              className="p-2 rounded-full text-blue-600"
                              aria-label="Edit category"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="p-2 rounded-full text-red-600"
                              aria-label="Delete category"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;