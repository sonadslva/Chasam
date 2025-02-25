import React, { useState } from "react";
import li1 from "../assets/li1.png";
import { FaChevronCircleLeft } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocalPhone } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { motion } from "framer-motion";
import { CiCircleMore } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

const PopUp = ({ openPopUp, setOpenPopUp }) => {
  const [showOtherDetails, setShowOtherDetails] = useState(false);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#178000] z-[999]">
      <div className=" absolute w-full bottom-0 py-2 bg-[#fff] z-[999] flex justify-center items-center gap-5 BoxShadow">
        <button className="TextFont BoxShadow font-semibold px-10 py-2 rounded-lg bg-[#178000] text-[#fff] flex items-center gap-1 text-sm">
          <HiOutlineMail />
          Mail Us
        </button>
        <button className="TextFont BoxShadow px-10 py-2 font-semibold rounded-lg bg-[#178000] text-[#fff] flex items-center gap-1 text-sm">
          <MdLocalPhone />
          Contact Us
        </button>
      </div>
      <div className="px-2">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 1.2, ease: "backInOut" },
          }}
          className="fixed w-[95%] mx-auto top-2 bottom-0 rounded-t-3xl z-[998] popUpBg bg-[#fff] backdrop-blur-sm overflow-y-auto scrollBar"
        >
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <div className="flex pt-4 pl-4 mb-5">
              <span
                className="bg-[#093] p-1 rounded-full text-[#fff] text-xl"
                onClick={() => setOpenPopUp(!openPopUp)}
              >
                <FaChevronCircleLeft />
              </span>
            </div>
            {/* Images */}
            <div className="overflow-x-auto w-full scrollBar px-2">
              <div className="flex gap-2 mb-3 w-max whitespace-nowrap">
                <div className="w-[300px] flex justify-center items-center p-2 rounded-3xl h-[300px] backdrop-blur-sm bg-[#02842f2c] mb-2 BoxShadow border-[#fff] border relative overflow-hidden">
                  <div className="w-full h-[300px] absolute">
                    <img
                      src="https://i.pinimg.com/736x/b5/83/f8/b583f8122ce56da166e1cd9e5404fea0.jpg"
                      alt=""
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                  <div className="w-auto h-[250px] flex justify-center items-center">
                    <img
                      src={li1}
                      alt=""
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                <div className="w-[300px] flex justify-center items-center p-2 rounded-3xl h-[300px] backdrop-blur-sm bg-[#02842f2c] mb-2 BoxShadow border-[#fff] border relative overflow-hidden">
                  <div className="w-full h-[300px] absolute">
                    <img
                      src="https://i.pinimg.com/736x/b5/83/f8/b583f8122ce56da166e1cd9e5404fea0.jpg"
                      alt=""
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                  <div className="w-auto h-[250px] flex justify-center items-center">
                    <img
                      src={li1}
                      alt=""
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub Images */}
            <div className="overflow-x-auto w-full scrollBar px-2">
              <div className="flex gap-2 mb-3 w-max">
                <div className="w-[100px] h-[100px] p-2 bg-[#fff] shadow-2xl">
                  <img
                    src={li1}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-[100px] h-[100px] p-2 bg-[#fff] shadow-2xl">
                  <img
                    src={li1}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-[100px] h-[100px] p-2 bg-[#fff] shadow-2xl">
                  <img
                    src={li1}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-[100px] h-[100px] p-2 bg-[#fff] shadow-2xl">
                  <img
                    src={li1}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 mb-2 BoxShadow">
              <div className="text-xl font-bold text-[#000000] TextFont1">
                Krishna Thulasi Cough Syrup
              </div>
              <div className="text-sm font-semibold text-[#6e736d]">
                Cough Syrup
              </div>
              <div className="flex items-center font-bold TextFont">
                <MdCurrencyRupee />
                <span className="text-lg">260</span>
              </div>
            </div>
            <div className="px-4 text-[12px] text-[#000000] mb-3 font-semibold BoxShadow">
              <ul className="flex flex-col gap-1">
                <li className="flex items-start">
                  <span className="text-2xl">
                    <LuDot />
                  </span>
                  Lorem ipsum dolor sit
                </li>
                <li className="flex items-start">
                  <span className="text-2xl">
                    <LuDot />
                  </span>
                  Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Nisi, veniam.
                </li>
                <li className="flex items-start">
                  <span className="text-2xl">
                    <LuDot />
                  </span>
                  Lorem ipsum dolor sit lorem ipsum iii
                </li>
                <li className="flex items-start">
                  <span className="text-2xl">
                    <LuDot />
                  </span>
                  Lorem ipsum dolor sit
                </li>
              </ul>
            </div>

            {/* Usage */}
            <div className={`px-4 BoxShadow pb-2 ${showOtherDetails ? "mb-5" : "mb-20" }`}>
              <div className="relative">
                <div className="font-bold mb-2">Usage</div>
                <div className="font-semibold text-[12px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore quas, provident minus, assumenda laboriosam sunt autem
                  quisquam nisi, aliquam molestiae dolore reprehenderit commodi
                  beatae hic sint dolores architecto deleniti? Commodi!
                </div>
              </div>
              <div className="text-[12px] font-semibold items-center flex justify-end right-0">
                <div className="flex items-center" onClick={() => setShowOtherDetails(!showOtherDetails)}>
                  {}
                  <FiPlus />
                  More
                </div>
              </div>
            </div>

            {/* Other Details */}
            {showOtherDetails && (
              <div className="px-4 text-sm text-[#000000] mb-20 font-semibold">
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
                      : Rs. 260.00 inclussive of all taxes{" "}
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
                    <div className="w-[60%] text-[12px]">: 1 N</div>
                  </li>
                  <li className="flex items-start w-full gap-2">
                    <div className="w-[40%] flex text-[12px] items-center font-bold">
                      <span className="text-2xl">
                        <LuDot />
                      </span>
                      Manufactured By
                    </div>
                    <div className="w-[60%] text-[12px]">
                      : Chasam Ayurvedic Clinic, Vythiri, Wayanad, Kerala
                    </div>
                  </li>
                  <li className="flex items-center w-full gap-2">
                    <div className="w-[40%] flex text-[12px] items-center font-bold">
                      <span className="text-2xl">
                        <LuDot />
                      </span>
                      Country Of Origin
                    </div>
                    <div className="w-[60%] text-[12px]">: India</div>
                  </li>
                  <li className="flex items-center w-full gap-2">
                    <div className="w-[40%] flex text-[12px] items-center font-bold">
                      <span className="text-2xl">
                        <LuDot />
                      </span>
                      Customer Care Address
                    </div>
                    <div className="w-[60%] text-[12px]">: India</div>
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