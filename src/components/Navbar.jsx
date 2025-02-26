import React from 'react'
import { FaHome} from "react-icons/fa";
import { PiListBulletsBold } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom'
import { BiLogIn } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login"); 
  };
  return (
    <div className='fixed bottom-0 left-0 right-0 z-[997]'>
      <div>
        <nav className='w-full bg-[#3E7B27] text-[#fff] font-medium bg-gradient-to-r from-[#8d8d8d] via-[#ffffff] to-[#3E7B27] pt-[5px]  backdrop-blur-3xl'>
            <div className=' w-full h-full bg-[#000]'>
              <ul className='flex justify-evenly items-start gap-10 py-3 px-4 text-2xl lg:text-6xl'>
                  <Link to="/"><li className='flex flex-col justify-center items-center'><FaHome/></li></Link>
                  <Link to="/products"><li><GiMedicinePills/></li></Link>
                  <Link to="/contact"><li className='flex flex-col justify-center items-center'> <FaCircleUser/></li></Link>
                  <li className='flex flex-col justify-center items-center' onClick={redirectToLogin}> <BiLogIn/></li>
              </ul>
            </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar