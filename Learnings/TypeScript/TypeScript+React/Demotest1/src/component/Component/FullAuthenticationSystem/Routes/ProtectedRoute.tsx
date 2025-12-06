import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children, roles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles && !roles.includes(auth.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
