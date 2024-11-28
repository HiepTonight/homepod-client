import { useState } from 'react'
import { Link } from 'react-router-dom'

import {LuUser, LuMessageSquare, LuCalendar} from 'react-icons/lu'
import { HiTemplate } from "react-icons/hi";
import { FaSuitcase } from 'react-icons/fa'
import { TbUser } from 'react-icons/tb'
import { HiHomeModern } from "react-icons/hi2";
import { SiHomeassistant } from "react-icons/si";


const Sidebar = () => {
  const [activeLink ,setActiveLink] = useState(0);
  const handleLinkClick = (index) =>{
    setActiveLink(index)
  }
  const SIDEBAR_LINKS = [
    {id:1, path: "/", name: "Dashboard", icon:HiTemplate},
    {id:2, path: "/members", name: "Members", icon:TbUser},
    {id:3, path: "/messages", name: "Messages", icon:LuMessageSquare},
    // {id:4, path: "/projects", name: "Projects", icon:FaSuitcase},
    // {id:5, path: "/clients", name: "Clients", icon:LuUser},
    {id:6, path: "/work", name: "Work Plan", icon:LuCalendar}
  ]
  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen boder-r pt-8 px-4 bg-[#1a1c1e]'>
      {/* logo */}
      <div className='mb-8 flex justify-around'>
        <SiHomeassistant className='text-3xl text-white' />
        <p className='hidden md:flex text-2xl font-semibold text text-white'>Smarthome</p>
        {/* <img src="" alt="logo" className='w-28 hidden md:flex' />
        <img src="" alt="logo" className='w-8 flex md:hidden' /> */}
      </div>

      {/* Navigation Links */}
      <ul className='mt-6 space-y-6 text-[#9ea3b0]'>
        {
          SIDEBAR_LINKS.map((link, index)=>(
            <li key={index} className={`flex font-medium rounded-md py-y px-2 md:px-5 hover:bg-[#317ff3] hover:text-white ${activeLink === index ? "bg-[#317ff3] text-white": ""}`} >
              <Link 
              to={link.path} 
              className='flex items-center md:space-x-5'
              onClick={() => handleLinkClick(index)}
              >
                <span >{link.icon()}</span>
                <span className='hidden md:flex item'>{link.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>

      <div className='w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center'>
        <p className='flex items-center space-x-2 text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full'>
          {" "}
          <span>?</span> <span className='hidden md:flex'>Need Help?</span>
        </p>
      </div>
    </div>
  )
}

export default Sidebar