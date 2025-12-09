import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ roles, children }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Not logged in → unauthorized (instead of login)
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Logged in but role mismatch → unauthorized
  if (roles && !roles.includes(auth.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
