import React from "react";
import { IoClose } from "react-icons/io5";
import li1 from "../assets/li1.png";
import { FaChevronCircleLeft } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocalPhone } from "react-icons/md";
import { LuDot } from "react-icons/lu";

const PopUp = ({ openPopUp, setOpenPopUp }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#178000] z-[999]">
      <div className=" absolute w-full bottom-0 py-2 bg-[#fff] z-[999] flex justify-center items-center gap-5">
        <button className="TextFont px-10 py-2 rounded-lg bg-[#178000] text-[#fff] flex items-center gap-1 text-sm">
          <HiOutlineMail />
          Mail Us
        </button>
        <button className="TextFont px-10 py-2 rounded-lg bg-[#178000] text-[#fff] flex items-center gap-1 text-sm">
          <MdLocalPhone />
          Contact Us
        </button>
      </div>
      <div className="px-2">
        <div className="fixed w-[95%] mx-auto top-2 bottom-0 rounded-t-3xl z-[998] popUpBg bg-[#fff] backdrop-blur-sm overflow-y-auto scrollBar">
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
            <div className="w-[95%] flex justify-center items-center mx-auto p-2 rounded-3xl h-[300px] backdrop-blur-sm bg-[#02842f2c] mb-2 BoxShadow border-[#fff] border relative overflow-hidden">
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

            <div className="px-4 mb-2">
              <div className="text-xl font-semibold text-[#000000] TextFont1">
                Krishna Thulasi Cough Syrup
              </div>
              <div className="text-sm font-black text-[#248f00]">
                Cough Syrup
              </div>
              <div className="flex items-center gap-1 font-bold TextFont">
                <MdCurrencyRupee />
                260
              </div>
            </div>
            <div className="px-4 text-sm text-[#000000] mb-20 font-semibold">
              <ul className="flex flex-col gap-1">
                <li className="flex items-start"><span className="text-2xl"><LuDot/></span>Lorem ipsum dolor sit</li>
                <li className="flex items-start"><span className="text-2xl"><LuDot/></span>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, veniam.</li>
                <li className="flex items-start"><span className="text-2xl"><LuDot/></span>Lorem ipsum dolor sit lorem ipsum iii</li>
                <li className="flex items-start"><span className="text-2xl"><LuDot/></span>Lorem ipsum dolor sit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
