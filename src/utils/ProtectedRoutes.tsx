import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider'

const ProtectedRoutes = () => {
    // const { isAuthenticated } = useAuth();
    localStorage.getItem('token')
    const isAuthenticated = !!localStorage.getItem('token')
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  export default ProtectedRoutes;