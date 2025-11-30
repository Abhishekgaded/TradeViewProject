// import { Routes, Route } from "react-router-dom"
// import PublicRoute from "./Routes/PublicRoute"
// import Login from "./Pages/Login"
// import ProtectedRoute from "./Routes/ProtectedRoute"
// import DashboardLayout from "../Routes/MultiPageForm/Dashboard"
// import Settings from "../Routes/MultiPageForm/Settings"
// import AdminPage from "./Pages/AdminPanel"
// import UnAuthorizedPage from "./Pages/UnAuthorizedPage"
// import Profile from "../Routes/MultiPageForm/Profile"
// import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute"


// const FullAuthenticationSysMain = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<PublicRoute><Login /></PublicRoute>} ></Route>


//       {/* <Route path="/dashboard" element={<ProtectedRoute roles={["user", "admin"]} ><DashboardLayout /></ProtectedRoute>}> </Route>
//       <Route path="/dashboard/settings" element={<ProtectedRoute roles={["user", "admin"]} ><Settings /></ProtectedRoute>}> </Route>
//       <Route path="/dashboard/profile" element={<ProtectedRoute roles={["user", "admin"]} ><Profile /></ProtectedRoute>}> </Route> */}
//       {/* <Route path="/admin" element={<ProtectedAdminRoute roles={["admin"]} ><AdminPage /></ProtectedAdminRoute>}> </Route> */}


//       <Route path="/dashboard" element={
//         <ProtectedRoute roles={["user", "admin"]}>
//           <DashboardLayout />
//         </ProtectedRoute>
//       }>
//         <Route path="settings" element={<Settings />} />
//         <Route path="profile" element={<Profile />} />

//         {/* Admin route under dashboard */}
//         <Route path="admin" element={
//           <ProtectedAdminRoute>
//             <AdminPage />
//           </ProtectedAdminRoute>
//         } />
//       </Route>


//       <Route path="/unauthorized" element={<UnAuthorizedPage />} />

//     </Routes >
//   )
// }

// export default FullAuthenticationSysMain



import { Routes, Route } from "react-router-dom";

import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute";

import Login from "./Pages/Login";
import DashboardLayout from "../Routes/MultiPageForm/Dashboard";
import Settings from "../Routes/MultiPageForm/Settings";
import Profile from "../Routes/MultiPageForm/Profile";
import AdminPage from "./Pages/AdminPanel";
import UnAuthorizedPage from "./Pages/UnAuthorizedPage";

const FullAuthenticationSysMain = () => {
  return (
    <Routes>
      {/* Public (only when NOT logged in) */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* PROTECTED — dashboard wrapper */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["user", "admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Nested: /dashboard/settings */}
        <Route path="settings" element={<Settings />} />

        {/* Nested: /dashboard/profile */}
        <Route path="profile" element={<Profile />} />

        {/* Admin-only: /dashboard/admin */}
        <Route
          path="admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
      </Route>

      {/* Unauthorized page */}
      <Route path="/unauthorized" element={<UnAuthorizedPage />} />

      {/* Fallback for undefined routes, optional */}
      <Route path="*" element={<UnAuthorizedPage />} />
    </Routes>
  );
};

export default FullAuthenticationSysMain;
