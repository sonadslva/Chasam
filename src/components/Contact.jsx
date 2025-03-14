import React from "react";
import { FaUser } from "react-icons/fa6";
import { MdPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { MdMessage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaChevronCircleLeft } from "react-icons/fa";
import wave from "../assets/waveorg.png"
import { MdLocationPin } from "react-icons/md";
import imglocation from '../assets/location.png'
import { AiFillGoogleCircle } from "react-icons/ai";
const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "3e557a00-0b21-45e5-b274-496427ac9210");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully!");
      event.target.reset();
    
      // Remove message after 3 seconds
      setTimeout(() => {
        setResult("");
      }, 3000);
    } else {
      console.log("Error", data);
      setResult(data.message);
    
      // Remove error message after 3 seconds
      setTimeout(() => {
        setResult("");
      }, 3000);
    }
    
  };

  return (
    <div className="h-full ContactBg relative bgGradient mix-blend-multiply md:max-w-[1400px] md:mx-auto w-full md:ml-[2px] overflow-y-hidden">
      <div className="flex flex-col items-center justify-center py-5  w-full max-w-[1400px] mx-auto">
        <a href="/">
          <div className="absolute top-4 left-4 text-xl bg-[#fff] p-1 rounded-full">
            <FaChevronCircleLeft />
          </div>
        </a>
        
        {/* Wave and title section */}
        <div className="relative w-full flex justify-center md:hidden">
          <img src={wave} alt="" className="max-w-full" />
          <img
            src={wave}
            alt=""
            className="opacity-10 absolute top-2 drop-shadow-sm rotate-3 max-w-full"
          />
        </div>
        
        {/* Rest of the content */}
        <div className="md:pt-10 text-center mb-3 text-3xl md:text-3xl drop-shadow-2xl font-bold text-[#fff]">
          Contact Us
        </div>
        
        <div className="md:flex md:justify-center md:items-start w-full md:gap-10 max-w-[1200px] mx-auto md:pt-10">
          <div className="flex flex-col justify-center items-center w-full px-2 md:w-[60%]">
            <form
              action=""
              className="w-full flex flex-col gap-2 mb-5"
              onSubmit={onSubmit}
            >
              <div className="relative flex items-center w-full">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-8 py-2 rounded-3xl border-[2px] border-[#fff] backdrop-blur-sm outline-none text-[#fff]"
                  name="firstname"
                />
                <span className=" absolute right-4 text-[#fff]">
                  <FaUser />
                </span>
              </div>
              <div className="relative flex items-center w-full">
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="w-full px-8 py-2 rounded-3xl border-[2px] border-[#fff] backdrop-blur-sm outline-none text-[#fff]"
                  name="phonenumber"
                />
                <span className=" absolute right-4 text-[#fff]">
                  <MdPhone />
                </span>
              </div>
              <div className="relative flex items-center w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-8 py-2 rounded-3xl border-[2px] border-[#fff] backdrop-blur-sm outline-none text-[#fff]"
                  name="email"
                />
                <span className="absolute right-4 text-[#fff]">
                  <HiOutlineMail />
                </span>
              </div>
              <div className="relative flex items-start w-full">
                <textarea
                  name="message"
                  placeholder="Message"
                  id=""
                  className="w-full px-8 py-2 rounded-3xl border-[2px] border-[#fff] backdrop-blur-sm outline-none text-[#fff]"
                ></textarea>
                <span className="absolute right-4 text-[#fff] top-2">
                  <MdMessage />
                </span>
              </div>
              <div className="flex justify-between w-full rounded-2xl bg-[#fff]">
                <button className="flex items-center textGradient2 justify-center font-bold gap-2 px-10 w-full py-2 rounded-2xl">
                  Submit <IoIosSend className="text-[#00af0f]" />
                </button>
              </div>
            </form>
            <span>{result}</span>

            {/* Social Media */}
            <div className="flex justify-center items-center gap-4 border-t w-full pt-3 border-[#fff]">
            <a
                href="https://search.google.com/local/writereview?placeid=ChIJG6gdUlVzpjsR8Sj5q9DT2h4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[#fff]"
              >
                <AiFillGoogleCircle />
              </a>
              <div className="text-2xl text-[#fff]">
                <BiLogoFacebookCircle />
              </div>
              <a
                href="https://www.instagram.com/chasamayurvedicspicesgarden?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[#fff]"
              >
                <RiInstagramFill />
              </a>
              <a
                href="https://wa.me/919072423493"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[#fff]"
              >
                <IoLogoWhatsapp />
              </a>
              <a
                href="https://maps.app.goo.gl/sFaWva2sS49HMHip7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[#fff]"
              >
                <MdLocationPin />
              </a>
            </div>
          </div>
          <div className="hidden md:flex md:flex-col md:w-[40%]">
            <div className="mb-2 text-3xl font-semibold text-[#fff]">
              🌿 Experience the Essence of Ayurveda & Pure Spices 🌿
            </div>
            <div className="text-[#fff]">
              We are always here to assist you! Whether you have questions about
              our Ayurvedic products, need guidance on our organic spices, or want
              to visit our store, feel free to reach out.
              <span className="block font-bold">📍 Address </span>  📌 Chasam
              Ayurvedic & Spices Garden Vythiri, Wayanad, Kerala, India<span className="block font-bold">📲 Get in
              Touch</span>  📞 Phone: +91 90724 23493 <span className="block">✉️ Email: chasamayurvedic@gmail.com</span>
            
            </div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="relative w-full flex justify-center mt-1 ">
          <img src={wave} alt="" className="max-w-full" />
          <img
            src={wave}
            alt=""
            className="opacity-10 absolute top-2 drop-shadow-sm rotate-3 max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;