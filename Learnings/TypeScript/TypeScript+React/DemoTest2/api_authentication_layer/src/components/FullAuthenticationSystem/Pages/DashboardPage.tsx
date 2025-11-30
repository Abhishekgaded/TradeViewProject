// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Outlet, useNavigate } from 'react-router-dom';

// const DashboardPage = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate(); // <-- corrected

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div>
//       <button onClick={handleLogout}>LogOut</button>
//       <Outlet />
//     </div>
//   );
// };

// export default DashboardPage;



import { useEffect, useState } from 'react';
import api from '../../../../../Backbone/api';




const DashboardPage = () => {
  const [data, setData] = useState(null);

  const load = async () => {
    try {
      const res = await api.get('/user/profile');
      setData(res.data);
    } catch (error) {
      console.log('Error fetching profile', error);
    }
  }


  useEffect(() => {
    load();
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default DashboardPage
