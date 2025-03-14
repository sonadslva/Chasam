import React, { useState, useEffect } from "react";
import p1 from "../assets/p1.jpg";
import leaft2 from "../assets/VYTHITI2.png";
import PopUp from "./PopUp";
import hmimage1 from "../assets/homeimage1.png";
import hmimage2 from "../assets/homeimage2.png";
import hmimage3 from "../assets/homeimage3.png";
import { IoRefreshCircleSharp } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { ref, push, onValue } from "firebase/database";
import { dbRealtime } from "../firebaseConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/pagination';
import { getDatabase } from "firebase/database";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bannerRef = ref(dbRealtime, "banners");

    const unsubscribe = onValue(bannerRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const bannerArray = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .filter((banner) => banner.status === "active"); // ✅ Filter only active banners

        setBanners(bannerArray);
      } else {
        setBanners([]);
      }
    });

    return () => unsubscribe(); // ✅ Cleanup on unmount
  }, []);

  //fetch categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const categoriesRef = ref(db, "categories");

    onValue(categoriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const categoriesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(categoriesArray);
      }
    });
  }, []);

  // Handle category click to navigate with category ID
  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="w-full h-full overflow-x-hidden ">
      <div className="relative w-full h-full overflow-x-hidden pt-0">
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-olive-green-background_23-2149725222.jpg?t=st=1739964142~exp=1739967742~hmac=2bc705054c2a2430867275dad61e87e6b18ad0dda207c3f165ca54f906f8a593&w=1060"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <section className="relative overflow-hidden md:px-6">
          <div>
            <div className="w-[600px] md:w-[1200px] md:h-[1200px] lg:w-[1600px] lg:h-[1600px] BannerCircle lg:top-[-900px] z-0 absolute h-[600px] rounded-full md:top-[-550px] top-[-290px] bgGradient overflow-hidden"></div>
            <div className="w-[600px] md:w-[1200px] md:h-[1200px] -z-10 absolute h-[600px] BannerCircle2 rounded-full top-[-270px] lg:top-[-880px] md:top-[-520px] bgGradient opacity-30 "></div>
            <div className=" absolute w-[70px] h-[70px]  left-[10px] top-2 drop-shadow-md">
              <img src={leaft2} alt="" />
            </div>
            <div className="relative text-[#fff] pr-2 pt-5 leading-tight">
              <div className="text-[12px]  text-[#B1C29E] text-end font-semibold">
                Leading Spice Retailer in Wayanad
              </div>
              <div className="text-2xl text-end font-bold TextFont1 ">
                Chasam Ayurvedic
              </div>
              <div className="text-[12px] text-[#B1C29E] text-end font-semibold">
                Authentic Ayurvedic & Spice Products
              </div>
            </div>
            <div className="overflow-x-auto mx-auto max-w-[1400px] scrollBar md:flex md:justify-center md:items-center md:gap-5 md:px-4">
              <div className="flex justify-between md:justify-center items-center gap-5 relative pt-[50px] px-2 mb-5">
                <div className="w-[100px] relative h-[100px] flex justify-center items-center flex-col gap-2 overflow-hidden bg-[#EFE3C2] border border-[#fff] rounded-xl HeaderElements">
                  <div className="w-[100px] HeaderElementsimg relative h-[60px]  overflow-hidden rounded-xl">
                    <img
                      src={hmimage1}
                      alt=""
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                  <div className="text-center font-bold text-[10px] leading-tight bottom-1 HeaderElementstext">
                    100% Organic
                  </div>
                </div>
                <div className="w-[100px] relative h-[100px] HeaderElements flex justify-center items-center flex-col gap-2 overflow-hidden bg-[#EFE3C2] border border-[#fff] rounded-xl">
                  <div className="w-[100px] HeaderElementsimg relative h-[60px] overflow-hidden rounded-xl">
                    <img
                      src={hmimage2}
                      alt=""
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                  <div className="text-center font-bold text-[10px] leading-tight bottom-1 HeaderElementstext">
                    Genuine Product
                  </div>
                </div>
                <div className="w-[100px] relative h-[100px] HeaderElements flex justify-center items-center flex-col gap-2 overflow-hidden bg-[#EFE3C2] border border-[#fff] rounded-xl">
                  <div className="w-[100px] HeaderElementsimg relative h-[60px] overflow-hidden rounded-xl">
                    <img
                      src={hmimage3}
                      alt=""
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                  <div className="text-center font-bold text-[10px] leading-tight bottom-1 HeaderElementstext">
                    Quality Guranteed
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:relative text-[#fff]">
                <p className="mt-4 text-lg md:text-xl text-white font-medium">
                  Chasam Ayurvedic & Spice Garden Shop offers pure Ayurvedic
                  products, exotic spices, and natural remedies sourced from
                  nature. We provide herbal supplements, organic spices,
                  essential oils, and handcrafted wellness products to support a
                  healthy lifestyle.
                </p>
              </div>
            </div>
            {/* banner */}

            <div className="mb-3 relative mt-2 md:px-2">
            {banners.length > 1 ? (
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                  clickable: true,
                  renderBullet: (index, className) => `
                    <span class="${className}" style="background-color: #95CD41; width: 10px; height: 10px; margin-bottom: 10px;"></span>
                  `,
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] BoxShadow border-[#fff] border rounded-xl overflow-hidden"
              >
                {banners.map((banner) => (
                  <SwiperSlide key={banner.id} className="h-full">
                    <img
                      src={banner.image}
                      alt="Banner"
                      className="w-full h-full object-cover object-center"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : banners.length === 1 ? (
              <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] BoxShadow border-[#fff] border rounded-xl overflow-hidden">
                <img
                  src={banners[0].image}
                  alt="Banner"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ) : (
              <p>No active banners</p>
            )}
          </div>

            {/* Category */}
            <div className="grid grid-cols-2 md:grid-cols-3 px-2 gap-2 mb-5">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="cursor-pointer"
                >
                  <div className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-3xl overflow-hidden relative BoxShadow border border-[#fff]">
                    <div className="absolute w-full h-full bg-[#06660c48]"></div>
                    <div className="absolute bottom-1 text-[#fff] text-center px-2 w-full md:text-3xl">
                      {category.name}
                    </div>
                    <img
                      src={category.image || "default-image-url.jpg"}
                      className="w-full h-full object-cover"
                      alt={category.name}
                    />
                  </div>
                </div>
              ))}
              <Link to="/products">
                <div className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-3xl overflow-hidden relative BoxShadow border border-[#fff]">
                  <div className="absolute w-full h-full bg-[#06660c48]"></div>
                  <span className="text-5xl md:text-8xl relative flex justify-center items-center h-full">
                    <IoRefreshCircleSharp className="border border-[#fff] rounded-full" />
                  </span>
                  <div className="absolute bottom-1 text-[#fff] text-center px-2 w-full md:text-3xl">
                    See More
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        {/* Footer */}
        <section className="w-full flex flex-col justify-center items-center bg-[#000000] h-auto mb-[53px] md:mb-0 lg:mb-[90px]">
          <div className=" w-full  backdrop-blur-3xl">
            <div className="w-full h-full `rounded-[calc(1.5rem-1px)] bg-[#000] py-5">
              <div className="text-center font-bold text-lg text-[#fff] lg:text-4xl lg:mb-2">
                Vythiri Care
              </div>
              <div className="text-center px-2 text-[13px] text-[#fff] lg:text-xl">
                Chasam Ayurvedic & Spices Garden Shop in Wayanad is one of the
                leading businesses in the Spice Retailers.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
