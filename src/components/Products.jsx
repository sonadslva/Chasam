import React, { useState, useEffect } from "react";
import { dbRealtime } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { CgSearch } from "react-icons/cg";
import { TbCoinRupee } from "react-icons/tb";
import { MdOutlineArrowDropDown } from "react-icons/md";
import leaft2 from "../assets/leaf2.png";
import PopUp from "./PopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [banners, setBanners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Get category from URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("category");
    
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [location]);

  // Fetch categories from Firebase
  useEffect(() => {
    const categoryRef = ref(dbRealtime, "categories");
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoryList = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setCategories(categoryList);
      }
    });
  }, []);

  // Fetch all products
  useEffect(() => {
    const productRef = ref(dbRealtime, "products");
    onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...value,
          }))
          .filter(product => product.status !== "inactive"); // Filter out inactive products
        
        setProducts(productList);
        
        // Initial filtering of products based on selected category
        filterProductsByCategory(productList, selectedCategory);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }
    });
  }, []);

  // Filter products when category is selected
  useEffect(() => {
    filterProductsByCategory(products, selectedCategory);
    
    // Update URL with selected category
    const queryParams = new URLSearchParams(location.search);
    if (selectedCategory) {
      queryParams.set("category", selectedCategory);
    } else {
      queryParams.delete("category");
    }
    
    navigate({
      pathname: location.pathname,
      search: queryParams.toString()
    }, { replace: true });
  }, [selectedCategory, products]);

  // Filter products based on category
  const filterProductsByCategory = (allProducts, categoryId) => {
    if (!categoryId) {
      // If no category selected or "ALL" is selected, show all products
      setFilteredProducts(allProducts);
      return;
    }
    
    // Find the selected category name
    const selectedCategoryObj = categories.find(cat => cat.id === categoryId);
    if (!selectedCategoryObj) {
      setFilteredProducts(allProducts);
      return;
    }
    
    // Filter products by matching category name
    const filtered = allProducts.filter(product => 
      product.category === selectedCategoryObj.name
    );
    
    setFilteredProducts(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    // Filter products based on search query
    if (query.trim() === "") {
      // If search is empty, apply only category filter
      filterProductsByCategory(products, selectedCategory);
    } else {
      // Apply both search and category filters
      const searchFiltered = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(searchFiltered);
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery(""); // Reset search when changing category
  };

  // Fetch banners
  useEffect(() => {
    const bannerRef = ref(dbRealtime, "banners");

    const unsubscribe = onValue(bannerRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const bannerArray = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .filter((banner) => banner.status === "active");

        setBanners(bannerArray);
      } else {
        setBanners([]);
      }
    });

    return () => unsubscribe();
  }, []);
  const [selectedProductId, setSelectedProductId] = useState(null); 

  
  return (
    <div className="overflow-hidden relative w-full">
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-olive-green-background_23-2149725222.jpg?t=st=1739964142~exp=1739967742~hmac=2bc705054c2a2430867275dad61e87e6b18ad0dda207c3f165ca54f906f8a593&w=1060"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* top section */}
      <section className="relative overflow-hidden">
        <div>
        <div className="w-[600px] md:w-[1200px] md:h-[1200px] lg:w-[1600px] lg:h-[1600px] BannerCircle lg:top-[-900px] z-0 absolute h-[600px] rounded-full md:top-[-550px] top-[-290px] bgGradient overflow-hidden"></div>
        <div className="w-[600px] md:w-[1200px] md:h-[1200px] -z-10 absolute h-[600px] BannerCircle2 rounded-full top-[-270px] lg:top-[-880px] md:top-[-520px] bgGradient opacity-30 "></div>
          <div className=" absolute w-[100px] h-[100px] rotate-90 left-[-10px] drop-shadow-md">
            <img src={leaft2} alt="" />
          </div>
          <div className="relative text-[#fff] pr-2 pt-5 leading-tight mb-5">
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

          {/* banner */}
          <div className="px-2 mb-3  relative">
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
                className="w-full h-auto md:h-auto BoxShadow border-[#fff] border rounded-xl overflow-hidden"
              >
                {banners.map((banner) => (
                  <SwiperSlide key={banner.id}>
                    <img
                      src={banner.image}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : banners.length === 1 ? (
              <div className="w-full h-auto md:h-auto BoxShadow border-[#fff] border rounded-xl overflow-hidden">
                <img
                  src={banners[0].image}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <p>No active banners</p>
            )}
          </div>

          {/* search */}
          <div className="px-2 w-full mb-3 max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-r from-[#13c200] via-[#7eff87] to-[#006000] rounded-3xl p-[1px]">
              <div className="relative w-full flex justify- items-center bg-[#fff] py-3 lg:py-4 rounded-3xl">
                <input
                  type="text"
                  placeholder="Search Product..."
                  className="border-none w-full outline-none px-4 text-[#5B913B]"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className=" absolute right-5 text-2xl text-[#5B913B]">
                  <CgSearch />
                </div>
              </div>
            </div>
          </div>

          {/* category */}
          <div className="mb-5 overflow-x-auto relative scrollBar px-2">
            <ul className="flex items-center lg:justify-center gap-2 font-semibold">
              {/* Add ALL option */}
              <li
                className="flex justify-center items-center flex-col text-[12px] font-semibold gap-1 cursor-pointer"
                onClick={() => handleCategorySelect(null)}
              >
                <div
                  className={`w-[80px] h-[80px] rounded-full border-[2px] overflow-hidden bgGradient ${
                    selectedCategory === null
                      ? "border-yellow-400"
                      : "border-[#00aa0b]"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-center">
                    <span className="text-white text-lg font-bold">ALL</span>
                  </div>
                </div>
                <span
                  className={`text-nowrap ${
                    selectedCategory === null
                      ? "font-bold text-yellow-400"
                      : "text-[#00aa0b]"
                  }`}
                >
                  All Products
                </span>
              </li>

              {/* Category list */}
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex justify-center items-center flex-col text-[12px] font-semibold gap-1 cursor-pointer"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div
                    className={`w-[80px] h-[80px] rounded-full border-[2px] overflow-hidden bg-[#1A1A19] ${
                      selectedCategory === category.id
                        ? "border-yellow-400"
                        : "border-[#00aa0b]"
                    }`}
                  >
                    <img
                      src={category.image}
                      className="w-full h-full object-cover"
                      alt={category.name}
                    />
                  </div>
                  <span
                    className={`text-nowrap ${
                      selectedCategory === category.id
                        ? "font-bold text-yellow-400"
                        : "text-[#00aa0b]"
                    }`}
                  >
                    {category.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* product list */}
      <section className="w-full px-2 mb-16 py-8">
        <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-2 relative z-20 mb-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="w-full ">
                <div
                  className="w-full relative flex gap-3 drop-shadow-sm h-[80px] p-1 ProductListBox backdrop-blur-sm rounded-xl border border-[#fff] bg-[#166000]"
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setOpenPopUp(true);
                  }}
                >
                  <div className="w-[70px] h-[70px] rounded-xl border-[#fff] border overflow-hidden ">
                    <img
                      src={
                        product.image || (product.images && product.images[0])
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[#fff] font-bold TextFont1">
                      {product.name}
                    </div>
                    <div className="text-[#fff] text-xl font-base flex gap-0.5 items-center">
                      <TbCoinRupee />
                      <span className="text-[17px] font-bold">
                        {product.price}
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-2 rounded-full bg-[#fff] top-2">
                    <MdOutlineArrowDropDown />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-white text-lg py-4">
              No products found
            </div>
          )}
        </div>
      </section>

      {openPopUp && (
        <PopUp
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          productId={selectedProductId}
        />
      )}
    </div>
  );
};

export default Products;