import React, { useState, useEffect } from "react";
import li1 from "../assets/li1.png";
import { FaChevronCircleLeft } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocalPhone } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { ref, onValue } from "firebase/database";
import { dbRealtime } from "../firebaseConfig";
// Add missing imports for the chevron icons
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FiMinus } from "react-icons/fi";

const PopUp = ({ openPopUp, setOpenPopUp, productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOtherDetails, setShowOtherDetails] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Define productImages state
  const [productImages, setProductImages] = useState([]);
  const [bgImage, setBgImage] = useState(null); 

  // Fetch product data from Firebase
useEffect(() => {
  if (!productId) return;
  setLoading(true);
  
  const productRef = ref(dbRealtime, `products/${productId}`);

  const unsubscribe = onValue(productRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setProduct({
        id: productId,
        ...data
      });
      
      // Set background image
      if (data.bgImage) {
        setBgImage(data.bgImage);
      }
      
      // For debugging - log the data structure
      console.log("Product data:", data);
      
      // Extract images array 
      let imagesArray = [];
      
      // Check if there's an images object/array
      if (data.images) {
        if (typeof data.images === 'object' && !Array.isArray(data.images)) {
          // If images is a Firebase object with keys
          imagesArray = Object.values(data.images).filter(img => img && typeof img === 'string');
        } else if (Array.isArray(data.images)) {
          // If images is already an array
          imagesArray = data.images.filter(img => img && typeof img === 'string');
        }
      }
      
      // If no images found but there's a single image property
      if (imagesArray.length === 0 && data.image && typeof data.image === 'string') {
        imagesArray = [data.image];
      }
      
      console.log("Images array:", imagesArray);
      setProductImages(imagesArray);
    } else {
      setProduct(null);
      setProductImages([]);
      setBgImage(null);
    }
    setLoading(false);
  });
  
  return () => unsubscribe();
}, [productId]);

  if (loading) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#178000] z-[999] flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#178000] z-[999] flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
          <p>Product not found</p>
        </div>
      </div>
    );
  }
  // const [currentIndex, setCurrentIndex] = useState(0);
  let startX = 0;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      nextImage(); // Swipe left (next image)
    } else if (diff < -50) {
      prevImage(); // Swipe right (previous image)
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#178000] z-[999]">
      <div className="absolute w-full bottom-0 py-2 bg-[#fff] z-[999] flex justify-center items-center gap-5 BoxShadow">
        <button className="TextFont BoxShadow font-semibold px-10 py-2 rounded-lg bg-[#178000] text-[#fff] flex items-center gap-1 text-sm">
          <HiOutlineMail />
          Mail Us
        </button>
        <button className="TextFont BoxShadow px-10 py-2 font-semibold rounded-lg bg-[#178000] text-[#fff] flex items-center gap-1 text-sm">
          <MdLocalPhone />
          Contact Us
        </button>
      </div>
      <div className="px-2 md:px-[25%] md:pt-[-10px]">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 1.2, ease: "backInOut" },
          }}
          className="fixed w-[95%] md:w-[50%] md:flex md:flex-col md:justify-center mx-auto top-[30%] md:top-[50%] md:-translate-y-1/2 bottom-0 md:bottom-auto rounded-t-3xl z-[998] popUpBg bg-[#fff] backdrop-blur-sm overflow-y-auto md:overflow-y-visible scrollBar max-h-[90vh] md:max-h-[90vh]"
          >
          <div className="w-full h-full overflow-y-auto scrollBar ">
            <div className="flex pt-4 pl-4 mb-5">
              <span
                className="bg-[#0000] p-1 rounded-full text-[#178000] text-xl"
                onClick={() => setOpenPopUp(false)}
              >
                <FaChevronCircleLeft />
              </span>
            </div>

            <div className="md:flex ">
              {/* Main Image Slider */}
              <div
                className="w-full md:w-[70%] flex justify-center items-center rounded-2xl h-[280px] backdrop-blur-sm mb-2  relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Product Image with Animation */}
                <div className="w-full h-full flex justify-center items-center z-10">
                  <motion.img
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    src={
                      productImages.length > 0 ? productImages[currentIndex] : li1
                    }
                    alt={`${product?.name || "Product"} - Image ${
                      currentIndex + 1
                    }`}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                {/* Navigation Arrows - Only show if multiple images */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-green-600 text-white rounded-full p-2 opacity-80 hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-green-600 text-white rounded-full p-2 opacity-80 hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Pagination Indicators */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          currentIndex === index ? "bg-white" : "bg-gray-400"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {productImages.length > 1 && (
                <div className="overflow-x-auto md:overflow-y-auto md:h-[280px] w-full md:w-[30%] scrollBar px-2 py-1">
                  <div className="flex md:flex-col gap-2 mb-3 w-max md:w-full">
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-[100px] h-[100px] bg-[#fff] shadow-2xl rounded-md cursor-pointer overflow-hidden ${
                          currentIndex === index ? "ring-2 ring-green-600" : ""
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-2 mb-2 BoxShadow">
              <div className="text-xl font-bold text-[#000000] TextFont1">
                {product.name}
              </div>
              <div className="text-sm font-semibold text-[#6e736d]">
                {product.category}
              </div>
              <div className="flex items-center font-bold TextFont">
                <MdCurrencyRupee />
                <span className="text-lg">{product.price}</span>
              </div>
            </div>

            <div className="px-4 py-4 text-[12px] text-[#000000] mb-3 font-semibold BoxShadow">
              <h3 className="text-[16px] font-bold mb-2">Indication</h3>
              <div className="flex flex-col gap-1 ">
                {product.features && product.features.length > 0 ? (
                  product.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start">
                    <span>
                      {product.description || "No description available"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Usage */}
            <div
              className={`px-4 BoxShadow pb-2 ${
                showOtherDetails ? "mb-5" : "mb-14"
              }`}
            >
              <div className="relative">
                <div className="font-bold mb-2">Usage</div>
                <div className="font-semibold text-[12px]">
                  {product.usage || "Usage information not available"}
                </div>
              </div>
              <div className="text-[12px] font-semibold items-center flex justify-end right-0">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setShowOtherDetails(!showOtherDetails)}
                >
                  {showOtherDetails ? (
                    <div className="flex items-center gap-0.5">
                      <FiMinus />
                      Less
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5">
                      <FiPlus />
                      More
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Other Details */}
            {showOtherDetails && (
              <div className="px-4 text-sm text-[#000000] mb-14 font-semibold">
                <div className="TextFont font-bold text-xl mb-2">
                  Other Information
                </div>
                <ul className="flex flex-col gap-1">
                  <li className="flex items-start w-full gap-2">
                    <div className="w-[40%] flex text-[12px] items-center font-bold">
                      <span className="text-2xl">
                        <LuDot />
                      </span>
                      MRP
                    </div>
                    <div className="w-[60%] text-[12px]">
                      : Rs. {product.price}.00 inclusive of all taxes{" "}
                      <span className="block">
                        (MRP changes as per size selection)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start w-full gap-2">
                    <div className="w-[40%] flex text-[12px] items-center font-bold">
                      <span className="text-2xl">
                        <LuDot />
                      </span>
                      Net Qty
                    </div>
                    <div className="w-[60%] text-[12px]">
                      : {product.quantity || "1 N"}
                    </div>
                  </li>
                  <li className="flex items-start w-full gap-2">
                    <div className="w-[40%] flex text-[12px] items-center font-bold">
                      <span className="text-2xl">
                        <LuDot />
                      </span>
                      Manufactured By
                    </div>
                    <div className="w-[60%] text-[12px]">
                      :{" "}
                      {product.manufacturer ||
                        "Chasam Ayurvedic Clinic, Vythiri, Wayanad, Kerala"}
                    </div>
                  </li>
                  <li className="flex items-center w-full gap-2">
                    <div className="w-[40%] flex text-[12px] items-center font-bold">
                      <span className="text-2xl">
                        <LuDot />
                      </span>
                      Country Of Origin
                    </div>
                    <div className="w-[60%] text-[12px]">
                      : {product.country || "India"}
                    </div>
                  </li>
                  <li className="flex items-center w-full gap-2">
                    <div className="w-[40%] flex text-[12px] items-center font-bold">
                      <span className="text-2xl">
                        <LuDot />
                      </span>
                      Customer Care Address
                    </div>
                    <div className="w-[60%] text-[12px]">
                      : {product.customerCare || "India"}
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>
           
      </div>
    </div>  
  );
};

export default PopUp;