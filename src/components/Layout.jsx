import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <div className='flex'>
        <Sidebar/>
        <div className='w-full ml-16 lg:ml-56'>
          <Header/>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Layout;