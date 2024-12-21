import {GoBell} from 'react-icons/go'
import { HiChevronDown } from "react-icons/hi2";
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";


const Header = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-[#0c0f11]'>
      <div>
        <h1 className='text-xs text-white'>Welcome Back!</h1>
        <p className='text-xl font-semibold text-white'>Hiep Tran</p>
      </div>
      <div className='flex items-center space-x-5'>
        <div className='hidden md:flex'>
          <input 
            type="text" 
            placeholder='Search...' 
            className='bg-[#1a1c1e] px-4 py-2 rounded-lg focus:ring-indigo-600' />
        </div>
        <div className='flex items-center space-x-5'>
          <button className='relative text-2xl text-gray-600 bg-[#1a1c1e] rounded-lg p-2'>
            <GoBell />
            <span className='absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-red-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white'>9</span>
          </button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* <div className='flex justify-around items-center gap-2 bg-[#1a1c1e] p-2 rounded-lg'>
            <img className='w-6 g=6 rounded-full border-2 border-gray-500' src="https://randomuser.me/api/portraits/men/50.jpg" alt="" />
            <p className='text-[#808183] font-semibold'>Hiep Tran</p>
            <HiChevronDown className='text-[#808183]'/>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Header