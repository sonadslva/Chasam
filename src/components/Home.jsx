import React, { useState, useEffect, useActionState } from "react";
import p1 from "../assets/p1.jpg";
import leaft2 from "../assets/leaf2.png";
import PopUp from "./PopUp";
import hmimage1 from "../assets/homeimage1.png";
import hmimage2 from "../assets/homeimage2.png";
import hmimage3 from "../assets/homeimage3.png";
import { IoRefreshCircleSharp } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { ref, push, onValue } from "firebase/database";
import { dbRealtime } from "../firebaseConfig"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const Home = () => {

  const categoryLists = [
    {name : "Back Pain", img : "https://temruk.tomograd-kuban.ru/upload/iblock/f56/j3qqf1g0a0azavswxthterxth7vdr5u2.jpeg"},
    {name : "Weight Loss", img : "https://s.hdnux.com/photos/76/33/37/16365519/6/rawImage.jpg" },
    {name : "Back Pain", img : "https://temruk.tomograd-kuban.ru/upload/iblock/f56/j3qqf1g0a0azavswxthterxth7vdr5u2.jpeg"},{name : "Back Pain", img : "https://temruk.tomograd-kuban.ru/upload/iblock/f56/j3qqf1g0a0azavswxthterxth7vdr5u2.jpeg"},{name : "Back Pain", img : "https://temruk.tomograd-kuban.ru/upload/iblock/f56/j3qqf1g0a0azavswxthterxth7vdr5u2.jpeg"},
  ]
  const [banners, setBanners] = useState([]);

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

  return (
    <div className="overflow-hidden relative w-full">
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-olive-green-background_23-2149725222.jpg?t=st=1739964142~exp=1739967742~hmac=2bc705054c2a2430867275dad61e87e6b18ad0dda207c3f165ca54f906f8a593&w=1060"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <section className="relative overflow-hidden">
        <div>
          <div className="w-[600px] md:w-[1200px] md:h-[1200px] lg:w-[1600px] lg:h-[1600px] BannerCircle lg:top-[-900px] z-0 absolute h-[600px] rounded-full md:top-[-550px] top-[-290px] bgGradient overflow-hidden"></div>
          <div className="w-[600px] md:w-[1200px] md:h-[1200px] -z-10 absolute h-[600px] BannerCircle2 rounded-full top-[-270px] lg:top-[-880px] md:top-[-520px] bgGradient opacity-30 "></div>
          <div className=" absolute w-[100px] h-[100px] rotate-90 left-[-10px] drop-shadow-md">
            <img src={leaft2} alt="" />
          </div>
          <div className="relative text-[#fff] pr-2 pt-5 leading-tight">
            <div className="text-md text-[#B1C29E] text-end font-semibold">
              lorem ipsum
            </div>
            <div className="text-2xl text-end font-bold TextFont1">
              Lorem Ipsum
            </div>
            <div className="text-[12px] text-[#B1C29E] text-end font-semibold">
              lorem ipsum jui
            </div>
          </div>
          <div className="overflow-x-auto mx-auto max-w-[900px] scrollBar md:flex md:justify-center md:items-center md:gap-5 md:px-4">
            <div className="flex justify-between md:justify-center items-center gap-5 relative pt-[50px] px-2 mb-5">
              <div className="w-[100px] relative h-[100px] flex justify-center items-center flex-col gap-2 overflow-hidden bg-[#EFE3C2] border border-[#fff] rounded-xl">
                <div className="w-[100px] relative h-[60px] overflow-hidden rounded-xl">
                  <img
                    src={hmimage1}
                    alt=""
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <div className="text-center font-bold text-[10px] leading-tight bottom-1">
                  100% Organic
                </div>
              </div>
              <div className="w-[100px] relative h-[100px] flex justify-center items-center flex-col gap-2 overflow-hidden bg-[#EFE3C2] border border-[#fff] rounded-xl">
                <div className="w-[100px] relative h-[60px] overflow-hidden rounded-xl">
                  <img
                    src={hmimage2}
                    alt=""
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <div className="text-center font-bold text-[10px] leading-tight bottom-1">
                  Genuine Product
                </div>
              </div>
              <div className="w-[100px] relative h-[100px] flex justify-center items-center flex-col gap-2 overflow-hidden bg-[#EFE3C2] border border-[#fff] rounded-xl">
                <div className="w-[100px] relative h-[60px] overflow-hidden rounded-xl">
                  <img
                    src={hmimage3}
                    alt=""
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <div className="text-center font-bold text-[10px] leading-tight bottom-1">
                  Quality Guranteed
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:relative text-[#fff]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              adipisci corrupti itaque unde, cum reiciendis labore optio fugit
              pariatur voluptate asperiores perferendis
            </div>
          </div>
          {/* banner */}

          <div className="px-2 mb-3 relative">
            {banners.length > 1 ? (
              <Swiper
                modules={[Pagination, Autoplay]} // ✅ Add Autoplay module
                pagination={{
                  clickable: true,
                  renderBullet: (index, className) => `
          <span class="${className}" style="background-color: #95CD41; width: 10px; height: 10px; margin-bottom: 10px;"></span>
        `,
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }} // ✅ Auto-slide every 3 seconds
                loop={true}
                className="w-full h-[150px] md:h-auto BoxShadow border-[#fff] border rounded-xl overflow-hidden"
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
              <div className="w-full h-[150px] md:h-auto BoxShadow border-[#fff] border rounded-xl overflow-hidden">
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

          {/* Category */}
          <div className="px-2 mb-2 text-xl font-bold text-[#396C25] text-center lg:text-3xl">
            Product Categories
          </div>
          <div className="grid grid-cols-2 px-2 gap-2 mb-5">
            <a href="products">
              <div className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-3xl overflow-hidden relative BoxShadow border border-[#fff]">
                <div className=" absolute w-full h-full bg-[#06660c48]"></div>
                <div className="absolute bottom-1 text-[#fff] text-center px-2 w-full md:text-3xl">
                  Back Pain
                </div>
                <img
                  src="https://temruk.tomograd-kuban.ru/upload/iblock/f56/j3qqf1g0a0azavswxthterxth7vdr5u2.jpeg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </a>
            <a href="products">
              <div className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-3xl overflow-hidden relative BoxShadow border border-[#fff]">
                <div className=" absolute w-full h-full bg-[#06660c48]"></div>
                <div className="absolute bottom-1 text-[#fff] text-center px-2 w-full md:text-3xl">
                  Weight Loss
                </div>
                <img
                  src="https://s.hdnux.com/photos/76/33/37/16365519/6/rawImage.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </a>
            <div>
              <div className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-3xl overflow-hidden relative BoxShadow border border-[#fff]">
                <div className=" absolute w-full h-full bg-[#06660c48]"></div>
                <div className="absolute bottom-1 text-[#fff] text-center px-2 w-full md:text-3xl">
                  Knee Pain
                </div>
                <img
                  src="https://www.soupstock.in/system/files/images/7a/9e/shutterstock_1444117922.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
            <a href="products">
              <div className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-3xl overflow-hidden relative BoxShadow border border-[#fff]">
                <div className=" absolute w-full h-full bg-[#06660c48]"></div>
                <div className="absolute bottom-1 text-[#fff] text-center px-2 w-full md:text-3xl">
                  Migraine
                </div>
                <img
                  src="https://static.mk.ru/upload/entities/2022/01/10/19/articles/facebookPicture/09/47/3d/3b/5ea28e7e01a644a0db554c43e9584a44.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </a>
            <a href="products">
              <div className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-3xl overflow-hidden relative BoxShadow border border-[#fff]">
                <div className=" absolute w-full h-full bg-[#06660c48]"></div>
                <div className="absolute bottom-1 text-[#fff] text-center px-2 w-full md:text-3xl">
                  Skin Issues
                </div>
                <img
                  src="https://duneego.ru/wp-content/uploads/2022/04/lechenie-sosudistyh-patologiy.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </a>
            <a href="products">
              <div className="w-full h-[150px] md:h-[200px] lg:h-[300px] rounded-3xl overflow-hidden relative BoxShadow border border-[#fff]">
                <div className=" absolute w-full h-full bg-[#06660c48]"></div>
                <span className="text-5xl md:text-8xl relative flex justify-center items-center h-full">
                  <IoRefreshCircleSharp className="border border-[#fff] rounded-full" />
                </span>
                <div className="absolute bottom-1 text-[#fff] text-center px-2 w-full md:text-3xl">
                  See More
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <section className="w-full flex flex-col justify-center items-center bg-[#000000] h-auto mb-[53px]">
        <div className="bg-gradient-to-r from-[#8d8d8d] via-[#ffffff] to-[#3E7B27] pt-[5px]  backdrop-blur-3xl">
          <div className="w-full h-full `rounded-[calc(1.5rem-1px)] bg-[#000] py-5">
            <div className="text-center font-bold text-lg text-[#fff]">
              Vythiri Care
            </div>
            <div className="text-center px-2 text-[13px] text-[#fff]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              consequatur corrupti nulla fugiat fuga labore aspernatur ipsam hic
              sequi cum
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;