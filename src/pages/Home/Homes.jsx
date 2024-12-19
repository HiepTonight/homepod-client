import React, { useEffect, useState } from 'react';
import getUserHomes from '../../apis/Homes/GetUserHomes';
import { useNavigate } from 'react-router-dom';
import HomeCard from './HomeCard';
import { GoPlus } from "react-icons/go";
import { TiEdit } from "react-icons/ti";
import { MdOutlineAddHome } from "react-icons/md";
import NewHomeModal from '../../components/NewHomeModal';

const Homes = () => {
  const [homes, setHomes] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const data = await getUserHomes();
        setHomes(data.data || []); // Đảm bảo rằng homes luôn là một mảng
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };

    fetchHomes();
  }, []);

  const handleHomeClick = (homeId) => {
    navigate(`/home/${homeId}`);
  };

  const removeHome = (homeId) => {
    setHomes(homes.filter(home => home.id !== homeId));
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleAddHome = () => {
    setIsModalVisible(true);
  };

  const addHome = (newHome) => {
    setHomes([...homes, newHome]);
  };

  return (
    <div className='p-5 divide-y divide-gray-500'>
      <div className='flex justify-between items-center pb-2'>
        <h1 className='text-sm sm:text-2xl font-bold text-white items-center'>Your Homes</h1>
        <div className='flex gap-2'>
          <button 
            className={`flex justify-between items-center gap-[3px] rounded-md p-1 px-2 sm:px-3 cursor-pointer transition-colors duration-300 ${isEditMode ? 'bg-blue-600 text-white' : 'text-gray-400 bg-gray-700'}`} 
            onClick={toggleEditMode}
          >
            <p className='hidden sm:flex'>Edit</p>
            <TiEdit />
          </button>
          <button 
            className='flex justify-between items-center gap-[3px] text-white bg-blue-600 rounded-md p-1 px-2 sm:px-3 cursor-pointer' 
            onClick={handleAddHome}
          >
            <p className='hidden sm:flex'>Add Home</p>
            <MdOutlineAddHome />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {homes.map(home => (
          <HomeCard
            key={home.id}
            home={home}
            removeHome={removeHome}
            isEditMode={isEditMode}
            // onClick={() => handleHomeClick(home.id)}
          />
        ))}
      </div>
      <NewHomeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        addHome={addHome}
      />
    </div>
  );
};

export default Homes;