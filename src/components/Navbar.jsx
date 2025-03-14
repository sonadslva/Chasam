import React from 'react';
import { FaHome } from "react-icons/fa";
import { PiListBulletsBold } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { BiLogIn } from "react-icons/bi";
import leaft2 from "../assets/vythiri.png";

const Navbar = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#3E7B27] text-white z-50'>
      <nav className='w-full bg-gradient-to-r from-[#8d8d8d] via-[#ffffff] to-[#3E7B27] pt-[5px] backdrop-blur-3xl'>
        <div className='w-full h-full bg-[#000] md:bg-white'>
          <ul className='flex justify-evenly items-center gap-10 py-3 px-4 text-2xl'>
            <Link to="/">
              <li className='flex flex-col items-center'>
                <FaHome />
                <span className="text-sm">Home</span>
              </li>
            </Link>
            <Link to="/products">
              <li className='flex flex-col items-center'>
                <GiMedicinePills />
                <span className="text-sm">Products</span>
              </li>
            </Link>
            <Link to="/contact">
              <li className='flex flex-col items-center'>
                <FaCircleUser />
                <span className="text-sm">Contact</span>
              </li>
            </Link>
            <li className='flex flex-col items-center cursor-pointer' onClick={redirectToLogin}>
              <BiLogIn />
              <span className="text-sm">Login</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;