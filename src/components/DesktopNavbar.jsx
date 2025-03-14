import React from 'react';
import { FaHome } from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import leaft2 from "../assets/vythiri.png";

const DesktopNavbar = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login"); 
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 w-[15%] z-50'>
      <div className='h-screen'>
        <nav className='w-full bg-gradient-to-b from-[#8d8d8d] via-[#ffffff] to-[#3E7B27] backdrop-blur-3xl h-full'>
          <div className='w-full h-full bg-black text-white md:bg-white md:text-black flex flex-col'>
            {/* Logo */}
            <div className='flex justify-center items-center py-6'>
              <img src={leaft2} alt="Logo" className="w-16 h-25" />
            </div>
            
            <ul className='flex flex-col h-full justify-start items-start gap-16 mt-8 px-8 text-4xl'>
              <Link to="/" className='w-full border-b-1'>
                <li className='flex flex-row items-center gap-3'>
                  <FaHome/>
                  <span className="text-lg">Home</span>
                </li>
              </Link>
              <Link to="/products" className='w-full border-b-1'>
                <li className='flex flex-row items-center gap-3'>
                  <GiMedicinePills/>
                  <span className="text-lg">Products</span>
                </li>
              </Link>
              <Link to="/contact" className='w-full border-b-1'>
                <li className='flex flex-row items-center gap-3'>
                  <FaCircleUser/>
                  <span className="text-lg">Contact</span>
                </li>
              </Link>
              <li className='flex flex-row items-center gap-3 cursor-pointer w-full border-b-1' onClick={redirectToLogin}>
                <BiLogIn/>
                <span className="text-lg">Login</span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default DesktopNavbar;