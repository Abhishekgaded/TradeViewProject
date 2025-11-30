import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { auth,loading } = useAuth();

if(loading){
  return <div style={{fontSize:'22px'}}>Loading...</div>
}


  if (!auth.isAuthenticated) {
    return <Navigate to='/' replace />
  }

  if (auth.role !== 'admin') {
    return <Navigate to='/unauthorized' replace />
  }

  return children

}


export default ProtectedAdminRoute;