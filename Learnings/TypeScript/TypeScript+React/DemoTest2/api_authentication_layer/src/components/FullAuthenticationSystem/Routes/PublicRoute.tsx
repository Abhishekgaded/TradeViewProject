import { Navigate } from "react-router-dom";
import  {useAuth}  from "../context/AuthContext";


const PublicRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
