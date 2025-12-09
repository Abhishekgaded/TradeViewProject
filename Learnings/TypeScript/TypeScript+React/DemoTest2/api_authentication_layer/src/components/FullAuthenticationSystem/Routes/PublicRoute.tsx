import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const PublicRoute = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>


  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
