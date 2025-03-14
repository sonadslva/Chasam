import React, { useState, useEffect } from "react";
import { ref, push, onValue, update, remove } from "firebase/database";
import { dbRealtime } from "../firebaseConfig";
import logo from "../assets/chasam.png";
import { IoMdLogOut } from "react-icons/io";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import imgb1 from "../assets/imgb1.jpeg";
import imgb2 from "../assets/imgb2.jpeg";
import { BiSolidFileImage } from "react-icons/bi";
import imgbgb from "../assets/imgbg.jpeg";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const ImageBanner = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBanners, setShowBanners] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [banners, setBanners] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const bannersRef = ref(dbRealtime, "banners");
    onValue(bannersRef, (snapshot) => {
      const data = snapshot.val();
      setBanners(data || {});
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout Error:", error));
  };

  return (
    <div
      className="flex h-screen  bg-cover bg-center bg-no-repeat object-contain"
      style={{ backgroundImage: `url(${imgbgb})` }}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-[999] bg-[#00000007] backdrop-blur-sm shadow-lg md:w-64 w-14 transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <AdminNav closeMenu={() => setMenuOpen(false)} />
      </div>

      {/* Main Content */}
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

        {/* Page Content */}
        <div className="relative flex-1 pt-[80px] p-4">
          {/* Background Image */}
          {/* <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${imgbgb})` }}
          /> */}

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center pt-5">
              MANAGE BANNERS
            </h2>

            <div className="flex gap-2 w-full">
              <div
                className="relative w-[50%] h-[180px] flex justify-center items-center rounded-3xl bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${imgb1})` }}
                onClick={() => {
                  setShowForm((prev) => !prev);
                  setShowBanners(false);
                }}
              >
                <div className="bg-black absolute inset-0 w-full h-full opacity-30 rounded-3xl"></div>
                <button className="text-white relative px-6 py-3 text-2xl font-black">
                  ADD BANNER
                </button>
              </div>

              <div
                className="relative w-[50%] h-[180px] flex justify-center items-center rounded-3xl bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${imgb2})` }}
                onClick={() => {
                  setShowBanners((prev) => !prev);
                  setShowForm(false);
                }}
              >
                <div className="bg-black absolute inset-0 w-full h-full opacity-30 rounded-3xl"></div>
                <button className="text-white relative px-6 py-3 text-2xl font-black">
                  VIEW BANNERS
                </button>
              </div>
            </div>

            {/* Banner Upload Form */}
            {showForm && (
              <div className="w-full max-w-md mx-auto bg-[#CBBA9E] p-6 mt-6 rounded-lg shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
                  ADD NEW BANNER
                </h3>
                <input
                  type="file"
                  className="w-full border border-[#51372A] bg-white p-2 rounded-lg focus:outline-none"
                />
                <div className="mt-4 flex justify-center gap-2 w-full">
                  <button
                    className="px-4 py-2 bg-[#8B6254] text-white rounded-lg w-full"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-[#435933] hover:bg-[#304421] text-white rounded-lg w-full">
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* Display Banners */}
            {showBanners && (
              <div className="mt-8 w-full relative bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-black mb-4 text-center">
                  UPLOADED BANNERS
                </h3>
                {Object.keys(banners).length === 0 ? (
                  <p className="text-black">No banners uploaded yet.</p>
                ) : (
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    {Object.entries(banners).map(([bannerId, banner]) => (
                      <div
                        key={bannerId}
                        className="shadow-lg bg-[#ab8c59] rounded-lg overflow-hidden"
                      >
                        <img
                          src={banner.image}
                          alt="Banner"
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-3 flex justify-between items-center">
                          <button
                            className={`px-3 py-1 rounded ${
                              banner.status === "active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            } text-white`}
                          >
                            {banner.status}
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded">
                            Delete
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

export default ImageBanner;
