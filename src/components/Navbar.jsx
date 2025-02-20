import React from 'react'
import { FaHome } from "react-icons/fa";
import { PiListBulletsBold } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosList } from "react-icons/io";
import { GiMedicinePills } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-[998]'>
      <div>
        <nav className='w-full bg-[#3E7B27] text-[#fff] font-medium border-t-[#96d407] border-t-[5px]'>
            <ul className='flex justify-evenly items-start gap-10 py-3 px-4 text-2xl'>
                <li className='flex flex-col justify-center items-center'><FaHome/></li>
                <li className='flex flex-col justify-center items-center'> <PiListBulletsBold/></li>
                <li><GiMedicinePills/></li>
                <li className='flex flex-col justify-center items-center'> <FaCircleUser/></li>
            </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
