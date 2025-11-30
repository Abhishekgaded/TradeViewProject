import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../FullAuthenticationSystem/context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {

  const { logout, auth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* <aside style={{ width: "200px", background: "#333", color: "white", padding: "20px" }}>
        <h3>Dashboard</h3>
        <Link to="profile">Profile</Link><br />
        <Link to="settings">Settings</Link>
      </aside> */}


      <aside style={{ width: "200px", background: "#333", color: "white", padding: "20px" }}>
        <h3>Dashboard</h3>

        <Link to="profile">Profile</Link><br />
        <Link to="settings">Settings</Link><br />

        {/* Show only if user is admin */}
        {auth?.role === "admin" && (
          <Link to="admin" style={{ color: "yellow" }}>Admin Panel</Link>
        )}
      </aside>


      <section style={{ padding: "20px", flex: 1 }}>
        <button onClick={handleLogout} >Logout</button>
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
