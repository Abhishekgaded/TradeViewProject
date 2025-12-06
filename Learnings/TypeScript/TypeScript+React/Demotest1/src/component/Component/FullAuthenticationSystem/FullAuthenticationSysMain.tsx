import { Routes, Route } from "react-router-dom"
import PublicRoute from "./Routes/PublicRoute"
import Login from "./Pages/Login"
import ProtectedRoute from "./Routes/ProtectedRoute"
import DashboardLayout from "../../Routes/MultiPageForm/Dashboard"
import Settings from "../../Routes/MultiPageForm/Settings"
import AdminPanel from "./Pages/AdminPanel"
import UnAuthorizedPage from "./Pages/UnAuthorizedPage"
import Profile from "../../Routes/MultiPageForm/Profile"


const FullAuthenticationSysMain = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} ></Route>
      <Route path="/dashboard" element={<ProtectedRoute roles={["user", "admin"]} ><DashboardLayout /></ProtectedRoute>}> </Route>
      <Route path="/dashboard/settings" element={<ProtectedRoute roles={["user", "admin"]} ><Settings /></ProtectedRoute>}> </Route>
      <Route path="/dashboard/profile" element={<ProtectedRoute roles={["user", "admin"]} ><Profile /></ProtectedRoute>}> </Route>
      <Route path="/admin" element={<ProtectedRoute roles={["admin"]} ><AdminPanel /></ProtectedRoute>}> </Route>
      <Route path="/unauthorized" element={<UnAuthorizedPage />} />

    </Routes >
  )
}

export default FullAuthenticationSysMain
