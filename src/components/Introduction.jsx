import React from 'react'
import logo from "../assets/vythiri.png"
import { motion } from "framer-motion"
import video from "../assets/an.webm"

const Introduction = () => {
  return (
    <div className='bg-[#ffffff] h-screen w-full flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 right-0 z-[999]'>
      <div>
        <div className='w-[100px] h-[100px]'>
          <video src={video} playsInline autoPlay loop muted className='w-full h-full object-contain drop-shadow-md'></video>
        </div>
      </div>
    </div>
  )
}

export default Introduction