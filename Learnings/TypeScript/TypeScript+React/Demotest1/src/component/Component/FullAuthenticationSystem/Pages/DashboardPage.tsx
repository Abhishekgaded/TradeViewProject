import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // <-- corrected

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>LogOut</button>
      <Outlet />
    </div>
  );
};

export default DashboardPage;
