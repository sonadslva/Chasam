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
import catbg1 from '../assets/catbg1.jpg'
import catbg2 from '../assets/catbg2.jpg'

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

  useEffect(() => {
    const categoriesRef = ref(dbRealtime, "categories");
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoriesArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setCategories(categoriesArray);
      } else {
        setCategories([]);
      }
    });
  }, []);

  const handleLogout = () => {
    navigate("/login");
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

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${categoryBg})` }}
      />
      <div className="relative z-10">
        <div className="flex h-auto">
          <div
            className={`sidebar fixed top-0 left-0 h-full z-[998] bg-[#00000007] backdrop-blur-sm shadow-lg w-14 transform transition-transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <AdminNav closeMenu={() => setMenuOpen(false)} />
          </div>
          <div className="flex flex-1 items-center w-full">
            <div className="flex items-center bg-[#00000000] py-4 px-0 z-[999] fixed top-0 w-full">
              <button
                className="menu-btn text-gray-700 text-2xl p-4"
                onClick={toggleMenu}
              >
                <FaEllipsisV className="text-white text-3xl" />
              </button>
              <div className="ml-[-5px] flex justify-center">
                <img src={logo} alt="Logo" className="w-14" />
              </div>
              <div
                className="flex justify-center ml-55 text-2xl"
                onClick={handleLogout}
              >
                <IoMdLogOut className="text-white text-3xl" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col h-auto px-2 mt-[80px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center pt-5">
              MANAGE CATEGORIES
            </h2>
            <div className="flex gap-2 w-full">
              {/* ADD CATEGORY BUTTON */}
              <div
                className="relative w-[50%] h-[180px] flex justify-center overflow-hidden items-center rounded-3xl bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${catbg1})` }}
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                  setShowCategories(false);
                }}
              >
                <div className="bg-[#000] absolute inset-0 w-full h-full -z-0 mix-blend-multiply opacity-30"></div>
                <button className="text-white relative px-6 py-3 rounded-lg text-2xl font-black transition">
                  ADD CATEGORY
                </button>
              </div>
              {/* VIEW CATEGORIES BUTTON */}
              <div
                className="relative w-[50%] h-[180px] flex justify-center overflow-hidden items-center rounded-3xl bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${catbg2})` }}
                onClick={() => {
                  setShowCategories((prev) => !prev);
                  setShowForm(false);
                }}
              >
                <div className="bg-[#000] absolute inset-0 w-full h-full -z-0 mix-blend-multiply opacity-30"></div>
                <button className="text-white relative px-6 py-3 rounded-lg text-2xl font-black transition">
                  VIEW CATEGORIES
                </button>
              </div>
            </div>

            {/* ADD/EDIT CATEGORY FORM */}
            {showForm && (
              <div className="w-full max-w-md bg-[#CBBA9E] p-6 mt-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  {isEditing ? "EDIT CATEGORY" : "ADD NEW CATEGORY"}
                </h3>
                <input
                  type="text"
                  placeholder="Category Name"
                  className="w-full border p-2 rounded-lg"
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
                <div className="mt-4 flex justify-center gap-2 w-full">
                  <button
                    className="px-4 py-2 bg-[#8B6254] text-white rounded-lg w-full"
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

            {/* VIEW CATEGORIES SECTION */}
            {showCategories && (
              <div className="mt-8 w-full mb-5">
                <h3 className="text-xl font-bold text-black mb-4 text-center">
                  UPLOADED CATEGORIES
                </h3>
                {categories.length === 0 ? (
                  <p className="text-black">No categories uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="bg-[#aea08f] p-4 rounded-lg shadow-lg relative"
                      >
                        <img
                          src={category.image}
                          alt="Category"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <p className="text-black text-center mt-2 font-bold">
                          {category.name}
                        </p>
                        <div className=" justify-center items-center flex gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className=" p-2 rounded-full text-blue-600 "
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className=" p-2 rounded-full text-red-600 "
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
  );
};

export default Category;