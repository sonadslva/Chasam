import React, { useState, useEffect, useActionState } from "react";
import p1 from "../assets/p1.jpg";
import leaft2 from "../assets/leaf2.png";
import PopUp from "./PopUp";
import li1 from "../assets/li1.png"
import {TbCoinRupee} from "react-icons/tb"
import {MdOutlineArrowDropDown} from "react-icons/md"
import li4 from "../assets/li4.png"
import li3 from "../assets/li3.png"
import li2 from "../assets/li2.png"
import { CgSearch } from "react-icons/cg";

const Products = () => {
    const [openPopUp, setOpenPopUp] = useState(false);
  
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
          <div className="w-[600px] z-0 absolute h-[600px] rounded-full top-[-290px] bgGradient overflow-hidden"></div>
          <div className="w-[600px] -z-10 absolute h-[600px] rounded-full top-[-270px] bgGradient opacity-30 "></div>
          <div className=" absolute w-[100px] h-[100px] rotate-90 left-[-10px] drop-shadow-md">
            <img src={leaft2} alt="" />
          </div>
          <div className="relative text-[#fff] pr-2 pt-5 mb-5 leading-tight">
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
          <div className="px-2 mb-5 relative">
            <div className="w-full h-[150px] BoxShadow border-[#fff] border rounded-xl bg-[#95CD41] overflow-hidden">
              <img src={p1} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Category */}
          <div className="px-2 w-full mb-3">
            <div className="bg-gradient-to-r from-[#13c200] via-[#7eff87] to-[#006000] rounded-3xl p-[1px]">
              <div className="relative w-full flex justify- items-center bg-[#fff] py-3 rounded-3xl">
                <input type="text" placeholder="Search Product..." className="border-none w-full outline-none px-4 text-[#5B913B]"/>
                <div className=" absolute right-5 text-2xl text-[#5B913B]"><CgSearch/></div>
              </div>
            </div>
          </div>
          <div className="mb-5 overflow-x-auto relative scrollBar px-2">
            <ul className="flex items-center gap-2 font-semibold">
              <li className="flex justify-center items-center flex-col text-[12px] font-semibold gap-1">
                <div className="w-[80px] h-[80px] rounded-full bg-[#1A1A19] border-[#00aa0b] border-[2px] overflow-hidden">
                  <img
                    src="https://temruk.tomograd-kuban.ru/upload/iblock/f56/j3qqf1g0a0azavswxthterxth7vdr5u2.jpeg"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <span className="text-nowrap font-semibold text-[#00aa0b]">
                  Back Pain
                </span>
              </li>
              <li className="flex justify-center items-center flex-col text-[12px] font-semibold gap-1">
                <div className="w-[80px] h-[80px] rounded-full bg-[#1A1A19] overflow-hidden">
                  <img
                    src="https://s.hdnux.com/photos/76/33/37/16365519/6/rawImage.jpg"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <span className="text-nowrap">Weight Loss</span>
              </li>
              <li className="flex justify-center items-center flex-col text-[12px] font-semibold gap-1">
                <div className="w-[80px] h-[80px] rounded-full bg-[#1A1A19] overflow-hidden">
                  <img
                    src="https://www.soupstock.in/system/files/images/7a/9e/shutterstock_1444117922.jpg"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <span className="text-nowrap font-bold">Weight Loss</span>
              </li>
              <li className="flex justify-center items-center flex-col text-[12px] font-semibold gap-1">
                <div className="w-[80px] h-[80px] rounded-full bg-[#1A1A19] overflow-hidden">
                  <img
                    src="https://static.mk.ru/upload/entities/2022/01/10/19/articles/facebookPicture/09/47/3d/3b/5ea28e7e01a644a0db554c43e9584a44.jpg"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <span className="text-nowrap">Migraine</span>
              </li>
              <li className="flex justify-center items-center flex-col text-[12px] font-semibold gap-1">
                <div className="w-[80px] h-[80px] rounded-full bg-[#1A1A19] overflow-hidden">
                  <img
                    src="https://duneego.ru/wp-content/uploads/2022/04/lechenie-sosudistyh-patologiy.jpg"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <span className="text-nowrap">Skin Isuues</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full px-2 mb-16">
        <div className="w-full flex flex-col gap-2 relative z-20 mb-2">
          <div className="w-full">
            <div
              className="w-full relative flex gap-3 drop-shadow-sm h-[80px] p-1 ProductListBox backdrop-blur-sm rounded-xl border border-[#fff] bg-[#166000]"
              onClick={() => setOpenPopUp(!openPopUp)}
            >
              <div className="w-[70px] h-[70px] rounded-xl border-[#fff] border overflow-hidden p-1">
                <img
                  src={li1}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#fff] font-bold TextFont1">
                  Krishna Thulasi Cough Syrup
                </div>
                <div className="text-[#fff] text-xl font-base flex gap-0.5 items-center">
                  <TbCoinRupee />
                  <span className="text-[17px] font-bold">260</span>
                </div>
              </div>
              <div className="absolute right-2 rounded-full bg-[#fff] top-2">
                <MdOutlineArrowDropDown />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className="w-full relative flex gap-3 drop-shadow-sm h-[80px] p-1 ProductListBox backdrop-blur-sm rounded-xl border border-[#fff] bg-[#166000]"
              onClick={() => setOpenPopUp(!openPopUp)}
            >
              <div className="w-[70px] h-[70px] rounded-xl border-[#fff] border overflow-hidden p-1">
                <img
                  src={li4}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#fff] font-bold TextFont1">
                  Khadi Natural Hair Oil
                </div>
                <div className="text-[#fff] text-xl font-base flex gap-0.5 items-center">
                  <TbCoinRupee />
                  <span className="text-[17px] font-bold">280</span>
                </div>
              </div>
              <div className="absolute right-2 rounded-full bg-[#fff] top-2">
                <MdOutlineArrowDropDown />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className="w-full relative flex gap-3 drop-shadow-sm h-[80px] p-1 ProductListBox backdrop-blur-sm rounded-xl border border-[#fff] bg-[#166000]"
              onClick={() => setOpenPopUp(!openPopUp)}
            >
              <div className="w-[70px] h-[70px] rounded-xl border-[#fff] border overflow-hidden p-1">
                <img
                  src={li3}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#fff] font-bold TextFont1">
                  Indhulekha Brinka Hair Oil
                </div>
                <div className="text-[#fff] text-xl font-base flex gap-0.5 items-center">
                  <TbCoinRupee />{" "}
                  <span className="text-[17px] font-bold">260</span>
                </div>
              </div>
              <div className="absolute right-2 rounded-full bg-[#fff] top-2">
                <MdOutlineArrowDropDown />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className="w-full relative flex gap-3 drop-shadow-sm h-[80px] p-1 ProductListBox backdrop-blur-sm rounded-xl border border-[#fff] bg-[#166000]"
              onClick={() => setOpenPopUp(!openPopUp)}
            >
              <div className="w-[70px] h-[70px] rounded-xl border-[#fff] border overflow-hidden p-1">
                <img
                  src={li2}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#fff] font-bold TextFont1">
                  COFOL Syrup
                </div>
                <div className="text-[#fff] text-xl font-base flex gap-0.5 items-center">
                  <TbCoinRupee />{" "}
                  <span className="text-[17px] font-bold">260</span>
                </div>
              </div>
              <div className="absolute right-2 rounded-full bg-[#fff] top-2">
                <MdOutlineArrowDropDown />
              </div>
            </div>
          </div>
        </div>
      </section>
      {openPopUp && <PopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />}
    </div>
  );
};

export default Products;