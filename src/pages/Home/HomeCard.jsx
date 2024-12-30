import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { deleteHome } from '../../apis/Homes/HomeService';
// import deleteHome from '../../apis/Homes/DeleteHome';

const HomeCard = ({ home, removeHome, isEditMode }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/home?id=${home.id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(async () => {
      try {
        await deleteHome(home.id);
        removeHome(home.id);
      } catch (error) {
        console.error('Error deleting home:', error);
      }
    }, 300); // Match the duration of the animation
  };

  return (
    <div className={`flex flex-col relative justify-between gap-2 bg-slate-900 rounded-lg shadow-lg p-2 sm:p-5 cursor-pointer transition-transform transform mt-2 duration-300 ${isDeleting ? 'scale-0' : 'scale-100'}`} 
      onClick={handleHomeClick}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className={`flex justify-center items-center absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-700 transition-opacity duration-300 ${isEditMode ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <IoTrashOutline />
      </button>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg sm:text-base font-semibold text-white'>{home.title}</h1>
        <IoHome className='text-gray-400 text-2xl' />
      </div>
      <div className='flex justify-between items-center text-gray-400'>
        <p>{home.description}</p>
      </div>
    </div>
  );
};

export default HomeCard;