import React, { useState, useEffect } from "react";
import { ref, push, onValue, update, remove } from "firebase/database";
import { dbRealtime } from "../firebaseConfig"; // Firebase Realtime Database
import logo from "../assets/chasam.png";
import { IoMdLogOut } from "react-icons/io";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import imgb1 from "../assets/imgb1.jpeg";
import imgb2 from "../assets/imgb2.jpeg";
import { BiSolidFileImage } from "react-icons/bi";
import imgbgb from "../assets/imgbg.jpeg";

const ImageBanner = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBanners, setShowBanners] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [banners, setBanners] = useState({}); // Store banners with keys

  // Fetch banners from Firebase
  useEffect(() => {
    const bannersRef = ref(dbRealtime, "banners");
    onValue(bannersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBanners(data);
      } else {
        setBanners({});
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
        setSelectedFile(reader.result); // Base64 image data
      };
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select an image!");
      return;
    }

    const newBanner = {
      image: selectedFile,
      date: new Date().toLocaleString(),
      status: "active",
    };

    try {
      const bannersRef = ref(dbRealtime, "banners");
      await push(bannersRef, newBanner);
      alert("Banner added successfully!");
      setShowForm(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("Failed to upload banner.");
    }
  };

  const handleStatusToggle = async (bannerId, currentStatus) => {
    try {
      await update(ref(dbRealtime, `banners/${bannerId}`), {
        status: currentStatus === "active" ? "inactive" : "active",
      });
    } catch (error) {
      console.error("Error updating banner status:", error);
      alert("Failed to update banner status.");
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await remove(ref(dbRealtime, `banners/${bannerId}`));
        alert("Banner deleted successfully!");
      } catch (error) {
        console.error("Error deleting banner:", error);
        alert("Failed to delete banner.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${imgbgb})` }} />
      <div className="relative z-10">
        <div className="flex h-auto">
          <div className={`fixed top-0 z-[998] left-0 h-full bg-[#00000007] backdrop-blur-sm shadow-lg w-14 transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <AdminNav closeMenu={() => setMenuOpen(false)} />
          </div>

          <div className="flex flex-1 items-center w-full">
            <div className="flex items-center bg-transparent py-4 px-0 fixed top-0 w-full z-[999]">
              <button className="menu-btn text-3xl p-4 focus:outline-none" onClick={toggleMenu}>
                <FaEllipsisV className="text-white" />
              </button>
              <div className="ml-[-5px] flex justify-center">
                <img src={logo} alt="Logo" className="w-14" />
              </div>
              <div className="flex justify-center ml-55 text-2xl" onClick={handleLogout}>
                <IoMdLogOut className="text-white text-3xl" />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col h-auto px-2 mt-[80px]">
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
 {/* Add Banner Form (Appears on Click) */}
 {showForm && (
              <div className="w-full max-w-md bg-[#CBBA9E] p-6 mt-6 rounded-lg shadow-lg mb-3">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  ADD NEW BANNER
                </h3>
                <div className="relative flex items-center">
                  <div className="absolute right-2">
                    <BiSolidFileImage />
                  </div>
                  <input
                    type="file"
                    className="w-full border border-[#51372A] bg-white p-2 rounded-lg focus:outline-none"
                    onChange={handleFileChange}
                  />
                </div>

                {selectedFile && (
                  <div className="mt-4">
                    <p className="text-white text-sm ">Preview:</p>
                    <img
                      src={selectedFile}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border border-gray-300 mt-2"
                    />
                  </div>
                )}
                <div className="mt-4 flex justify-center gap-2 w-full">
                  <button
                    className="px-4 py-2 bg-[#8B6254] text-white rounded-lg w-full"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedFile(null); // Reset preview
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#435933] hover:bg-[#304421] text-white rounded-lg w-full"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {showBanners && (
              <div className="mt-8 w-full relative">
                <div className="absolute inset-0 bg-[#ffffff79] bg-opacity-10 backdrop-blur-xl rounded-lg"></div>
                <div className="relative z-10 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-black mb-4 text-center">UPLOADED BANNERS</h3>
                  {Object.keys(banners).length === 0 ? (
                    <p className="text-black">No banners uploaded yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(banners).map(([bannerId, banner]) => (
                        <div key={bannerId} className="shadow-lg bg-[#ab8c59] rounded-lg overflow-hidden">
                          <img src={banner.image} alt="Banner" className="w-full h-40 object-cover" />
                          <div className="p-3 flex justify-between items-center">
                            <button
                              onClick={() => handleStatusToggle(bannerId, banner.status)}
                              className={`px-3 py-1 rounded ${banner.status === "active" ? "bg-green-500" : "bg-red-500"} text-white`}
                            >
                              {banner.status}
                            </button>
                            <button onClick={() => handleDeleteBanner(bannerId)} className="px-3 py-1 bg-red-600 text-white rounded">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;
